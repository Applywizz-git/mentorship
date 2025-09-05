// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL!;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY!;

if (!url || !anon) {
  console.warn(
    "[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Create .env.local and restart the dev server."
  );
}

// ✅ Explicitly persist the session across reloads, refresh tokens automatically,
// and detect PKCE redirects (if you ever use magic links / OAuth).
export const supabase = createClient(url, anon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // (optional) force browser localStorage; default is fine in browsers
    // storage: window.localStorage,
    // DO NOT set a custom storageKey unless you have a specific reason.
    // storageKey: "sb-custom" // <- avoid unless you know what you’re doing
  },
});
