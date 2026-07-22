CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    expiration_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'refunded', 'chargebacked', 'removed')),
    warning_email_sent_at TIMESTAMPTZ,
    final_email_sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.customers IS
    'Effective WhatsApp community access. Ebook-only purchases are intentionally excluded.';

CREATE TABLE public.webhook_events (
    fingerprint TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    product_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'processing'
        CHECK (status IN ('processing', 'completed', 'failed')),
    error_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_webhook_events_updated_at
BEFORE UPDATE ON public.webhook_events
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_customers_status ON public.customers (status);
CREATE INDEX idx_customers_expiration_date ON public.customers (expiration_date);
CREATE INDEX idx_webhook_events_status ON public.webhook_events (status);

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.customers FROM anon, authenticated;
REVOKE ALL ON TABLE public.webhook_events FROM anon, authenticated;
