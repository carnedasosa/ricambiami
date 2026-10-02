import { createBrowserClient } from '@supabase/ssr';

// ── Client-side Supabase client (singleton) ───────────────────────────────────
// Usato nei Client Components ('use client') per operazioni auth e query.

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
