// src/lib/auth.ts
import { supabase } from "@/lib/supabase";

/**
 * Clear app caches + any Supabase auth tokens so no stale session lingers.
 */
function clearAppCaches() {
  try {
    const APP_KEYS = [
      "currentMentorId",
      "aw.currentUser",
      "currentUser",
      "user",
      "aw.user",
    ];

    // Remove your app's cached items
    for (const k of APP_KEYS) {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    }

    // Remove Supabase auth keys (they're prefixed with "sb-" or "supabase.")
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("sb-") || key.startsWith("supabase.")) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // ignore storage errors
  }
}

let signingOut = false;

export async function logoutAndGo(to: string = "/") {
  if (signingOut) return;
  signingOut = true;

  try {
    // Proactively close realtime channels to stop any post-logout callbacks
    try {
      const channels = supabase.getChannels();
      for (const ch of channels) supabase.removeChannel(ch);
    } catch {
      // ignore
    }

    // Sign out (local scope is enough for this browser)
    // Race with a short timeout so slow networks never block the redirect
    await Promise.race([
      supabase.auth.signOut({ scope: "local" }),
      new Promise((resolve) => setTimeout(resolve, 600)),
    ]);
  } finally {
    clearAppCaches();
    signingOut = false;

    // Hard redirect so the whole app remounts from a clean auth state
    // (use assign so back button returns to pre-logout page if desired)
    window.location.assign(to);
  }
}
