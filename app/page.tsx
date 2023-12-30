import SideBar from "@/components/SideBar";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/login");
  }

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  console.log(users);

  return (
    <SideBar>
      <div></div>
    </SideBar>
  );
}
