import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://edkzukrfzubfuzsejmvr.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_19rdRC1Bqjxl2xZDaiLZ-w_h9JCt4LD'
  );
}
