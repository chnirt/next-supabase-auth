"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
}
