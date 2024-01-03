import SideBar from "@/components/SideBar";
import { getSession, protectRoute } from "@/services/Session";

export default async function Index() {
  await protectRoute();

  const session = await getSession();

  return (
    <SideBar>
      <div className="text-red-500">Hi! {session?.user.email}</div>
    </SideBar>
  );
}
