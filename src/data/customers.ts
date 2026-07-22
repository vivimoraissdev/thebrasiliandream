import { addMonths } from '@/config/products.config';
import type { CustomerRecord, CustomerStatus } from '@/types/customer';
import { getSupabaseAdmin } from '@/utils/supabase';

const PAGE_SIZE = 500;
const CUSTOMER_COLUMNS = 'id,email,phone,expiration_date,status,warning_email_sent_at,final_email_sent_at,created_at,updated_at';

export class CustomerDataError extends Error {
  constructor(operation: string) {
    super(`Customer data operation failed: ${operation}`);
    this.name = 'CustomerDataError';
  }
}

function throwDataError(operation: string, error: { code?: string } | null): never {
  console.error('customer_data_error', { operation, code: error?.code ?? 'unknown' });
  throw new CustomerDataError(operation);
}

function asCustomers(data: unknown): CustomerRecord[] {
  return (data ?? []) as CustomerRecord[];
}

export async function findCustomerByEmail(email: string): Promise<CustomerRecord | null> {
  const { data, error } = await getSupabaseAdmin()
    .from('customers')
    .select(CUSTOMER_COLUMNS)
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throwDataError('find_by_email', error);
  }
  return data as CustomerRecord | null;
}

export async function activateCustomerAccess(input: {
  email: string;
  phone: string;
  paidAt: Date;
  durationMonths: number;
  now?: Date;
}): Promise<void> {
  const now = input.now ?? new Date();
  const supabase = getSupabaseAdmin();

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const existing = await findCustomerByEmail(input.email);
    let expirationDate: Date | null;

    if (existing?.status === 'active' && existing.expiration_date === null) {
      expirationDate = null;
    } else {
      const existingExpiration = existing?.expiration_date
        ? new Date(existing.expiration_date)
        : null;
      const baseDate = existing?.status === 'active'
        && existingExpiration
        && existingExpiration > now
        ? existingExpiration
        : input.paidAt;

      expirationDate = addMonths(baseDate, input.durationMonths);
    }

    const values = {
      email: input.email,
      phone: input.phone,
      expiration_date: expirationDate?.toISOString() ?? null,
      status: 'active' as const,
      warning_email_sent_at: null,
      final_email_sent_at: null,
    };

    if (!existing) {
      const { error } = await supabase.from('customers').insert(values);
      if (!error) {
        return;
      }
      if (error.code === '23505') {
        continue;
      }
      throwDataError('insert_active_customer', error);
    }

    const { data, error } = await supabase
      .from('customers')
      .update(values)
      .eq('id', existing.id)
      .eq('updated_at', existing.updated_at)
      .select('id')
      .maybeSingle();

    if (error) {
      throwDataError('update_active_customer', error);
    }
    if (data) {
      return;
    }
  }

  throw new CustomerDataError('activate_customer_concurrency_limit');
}

export async function revokeCustomerAccess(
  email: string,
  status: Extract<CustomerStatus, 'refunded' | 'chargebacked'>,
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('customers')
    .update({ status })
    .eq('email', email);

  if (error) {
    throwDataError('revoke_customer', error);
  }
}

async function fetchPages(
  createQuery: (from: number, to: number) => PromiseLike<{
    data: unknown;
    error: { code?: string } | null;
  }>,
  operation: string,
): Promise<CustomerRecord[]> {
  const result: CustomerRecord[] = [];

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await createQuery(from, from + PAGE_SIZE - 1);
    if (error) {
      throwDataError(operation, error);
    }

    const page = asCustomers(data);
    result.push(...page);
    if (page.length < PAGE_SIZE) {
      return result;
    }
  }
}

export async function fetchWarningCandidates(start: Date, end: Date): Promise<CustomerRecord[]> {
  const supabase = getSupabaseAdmin();
  return fetchPages(
    (from, to) => supabase
      .from('customers')
      .select(CUSTOMER_COLUMNS)
      .eq('status', 'active')
      .gte('expiration_date', start.toISOString())
      .lt('expiration_date', end.toISOString())
      .is('warning_email_sent_at', null)
      .order('id')
      .range(from, to),
    'fetch_warning_candidates',
  );
}

export async function fetchEvictionCandidates(expiredBefore: Date): Promise<CustomerRecord[]> {
  const supabase = getSupabaseAdmin();
  const [expired, revoked] = await Promise.all([
    fetchPages(
      (from, to) => supabase
        .from('customers')
        .select(CUSTOMER_COLUMNS)
        .eq('status', 'active')
        .lt('expiration_date', expiredBefore.toISOString())
        .order('id')
        .range(from, to),
      'fetch_expired_candidates',
    ),
    fetchPages(
      (from, to) => supabase
        .from('customers')
        .select(CUSTOMER_COLUMNS)
        .in('status', ['refunded', 'chargebacked'])
        .order('id')
        .range(from, to),
      'fetch_revoked_candidates',
    ),
  ]);

  return [...new Map([...expired, ...revoked].map((customer) => [customer.id, customer])).values()];
}

export async function fetchRemovedEmailCandidates(): Promise<CustomerRecord[]> {
  const supabase = getSupabaseAdmin();
  return fetchPages(
    (from, to) => supabase
      .from('customers')
      .select(CUSTOMER_COLUMNS)
      .eq('status', 'removed')
      .is('final_email_sent_at', null)
      .order('id')
      .range(from, to),
    'fetch_removed_email_candidates',
  );
}

export async function fetchValidAccessCustomers(now = new Date()): Promise<CustomerRecord[]> {
  const supabase = getSupabaseAdmin();
  return fetchPages(
    (from, to) => supabase
      .from('customers')
      .select(CUSTOMER_COLUMNS)
      .eq('status', 'active')
      .or(`expiration_date.is.null,expiration_date.gt.${now.toISOString()}`)
      .order('id')
      .range(from, to),
    'fetch_valid_access_customers',
  );
}

async function updateCustomerIds(
  ids: string[],
  values: Record<string, unknown>,
  operation: string,
): Promise<void> {
  const supabase = getSupabaseAdmin();
  for (let index = 0; index < ids.length; index += 100) {
    const chunk = ids.slice(index, index + 100);
    const { error } = await supabase.from('customers').update(values).in('id', chunk);
    if (error) {
      throwDataError(operation, error);
    }
  }
}

export async function markWarningSent(id: string, sentAt = new Date()): Promise<void> {
  await updateCustomerIds([id], { warning_email_sent_at: sentAt.toISOString() }, 'mark_warning_sent');
}

export async function markCustomersRemoved(ids: string[]): Promise<void> {
  await updateCustomerIds(ids, { status: 'removed' }, 'mark_customers_removed');
}

export async function markFinalEmailSent(id: string, sentAt = new Date()): Promise<void> {
  await updateCustomerIds([id], { final_email_sent_at: sentAt.toISOString() }, 'mark_final_email_sent');
}
