import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function signInWithAzure() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "openid email profile",
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  if (data?.url) {
    // Redirect to OAuth provider
    window.location.href = data.url;
  }
}

export async function logout() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    throw error;
  }
}
