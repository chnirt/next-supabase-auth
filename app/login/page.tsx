"use client";

import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
          scopes: "openid email profile",
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Login error:", error.message);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };

  return (
    <button onClick={handleLogin} type="button" className="btn-login">
      Login with Azure
    </button>
  );
}
