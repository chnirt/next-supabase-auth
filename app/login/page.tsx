"use client";

import { signInWithAzure } from "@/services/auth";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await signInWithAzure();
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
