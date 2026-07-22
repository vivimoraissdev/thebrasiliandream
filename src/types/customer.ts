export type CustomerStatus = 'active' | 'refunded' | 'chargebacked' | 'removed';

export interface CustomerRecord {
  id: string;
  email: string;
  phone: string;
  expiration_date: string | null;
  status: CustomerStatus;
  warning_email_sent_at: string | null;
  final_email_sent_at: string | null;
  created_at: string;
  updated_at: string;
}
