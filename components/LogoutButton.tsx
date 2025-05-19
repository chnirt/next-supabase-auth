"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
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
