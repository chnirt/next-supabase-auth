import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getProfile } from "@/services/profile";
import { LogoutButton } from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile(session.user.id);

  if (profile?.role !== "admin") {
    redirect("/"); // Or show an unauthorized access page
  }

  return (
    <div>
      Welcome Admin {session.user.email}
      <LogoutButton />
    </div>
  );
}
