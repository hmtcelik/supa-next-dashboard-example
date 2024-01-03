import BussinessTable from "@/components/Business/BusinessesTable";
import SideBar from "@/components/Nav/SideBar";
import UsersTable from "@/components/User/UsersTable";
import { getSession, protectRoute } from "@/services/Session";
import Link from "next/link";

const BusinessesPage = async ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  await protectRoute();

  const session = await getSession();

  return (
    <>
      <h1 className="text-4xl dark:text-white">Businesses</h1>
      <div className="my-10 ">
        <Link href="/businesses/create">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            + Create Business
          </button>
        </Link>
      </div>
      <BussinessTable message={searchParams.message} />
    </>
  );
};

export default BusinessesPage;
