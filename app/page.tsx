import SideBar from "@/components/SideBar";
import Session from "@/services/server/Session";

export default async function Index() {
  await Session.protectRoute();

  return (
    <SideBar>
      <div></div>
    </SideBar>
  );
}
