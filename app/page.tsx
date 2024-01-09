import LineChart from "@/components/Charts/LineChart";
import LineChartForm from "@/components/Charts/LineChartForm";
import PieChart from "@/components/Charts/PieChart";
import SideBar from "@/components/Nav/SideBar";
import { getBusinessRatiosGivenMonth } from "@/services/Business";
import { protectRoute } from "@/services/Session";
import { getUserRoleRatio } from "@/services/User";

export default async function Index() {
  await protectRoute();

  var roleRatios;
  try {
    roleRatios = await getUserRoleRatio();
  } catch (e) {
    console.log(e);
  }

  return (
    <SideBar>
      <h1 className="text-4xl dark:text-white mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 ">
        <div className="w-full sm:max-w-1/3">
          <PieChart
            title={"Users Based on Role"}
            labels={roleRatios?.roles || []}
            series={roleRatios?.totals || []}
          />
        </div>
        <div className="w-full sm:max-w-1/3">
          <hr className="border-gray-300 block mt-12 mb-10 xl:hidden dark:border-gray-600" />
          <LineChartForm />
        </div>
      </div>
    </SideBar>
  );
}
