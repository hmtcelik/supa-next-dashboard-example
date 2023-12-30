import SideBar from "@/components/SideBar";
import UsersTable from "@/components/UsersTable";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UsersPage = async () => {
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

  return (
    <SideBar>
      <h1 className="text-4xl dark:text-white">Users</h1>
      <div className="mt-10">
        <UsersTable />
      </div>
    </SideBar>
  );
};

export default UsersPage;
