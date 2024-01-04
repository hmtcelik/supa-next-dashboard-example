import PieChart from "@/components/Charts/PieChart";
import SideBar from "@/components/Nav/SideBar";
import { protectRoute } from "@/services/Session";
import { getUserRoleRatio } from "@/services/User";

export default async function Index() {
  await protectRoute();

  const roleRatios = await getUserRoleRatio();

  return (
    <SideBar>
      <h1 className="text-4xl dark:text-white mb-10">Dashboard</h1>
      <PieChart
        title={"Users Based on Role"}
        labels={roleRatios.labels}
        series={roleRatios.data}
      />
    </SideBar>
  );
}
