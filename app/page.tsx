import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function HomePage() {
  const supabase = await createClient();

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, redirect to login page
  if (!session) {
    redirect("/login");
  }

  // Render welcome message and logout button when logged in
  return (
    <div>
      Welcome {session.user.email}
      <LogoutButton />
    </div>
  );
}
