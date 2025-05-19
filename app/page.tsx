import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";
import { getProfile } from "@/services/profile";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile(session.user.id);

  if (profile?.role === "admin") {
    redirect("/admin/dashboard"); // Redirect admin to admin dashboard
  }

  // Redirect regular users to the normal user page
  return (
    <div>
      Welcome user {session.user.email}
      <LogoutButton />
    </div>
  );
}
