import SideBar from "@/components/SideBar";
import UsersTable from "@/components/UsersTable";
import Session from "@/services/server/Session";
import Link from "next/link";

const UsersPage = async () => {
  await Session.protectRoute();

  return (
    <>
      <h1 className="text-4xl dark:text-white">Users</h1>
      <div className="my-10 ">
        <Link href="/users/create">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            + Create User
          </button>
        </Link>
      </div>
      <UsersTable />
    </>
  );
};

export default UsersPage;
