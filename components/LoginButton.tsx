"use client";
import { signInWithAzure } from "@/services/auth";

export function LoginButton() {
  const handleLogin = async () => {
    try {
      await signInWithAzure();
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };

  return <button onClick={handleLogin}>Login with Azure</button>;
}
