import SideBar from "@/components/SideBar";
import Session from "@/services/server/Session";

export default async function Index() {
  await Session.protectRoute();

  const session = await Session.get();

  return (
    <SideBar>
      <div className="text-red-500">Hi! {session?.user.email}</div>
    </SideBar>
  );
}
