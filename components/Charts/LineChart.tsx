"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type LineChartProps = {
  title: string;
  labels: string[];
  series: number[];
};

const LineChart = (props: LineChartProps) => {
  const options: ApexCharts.ApexOptions = {
    title: {
      text: props.title,
      style: {
        color: "gray",
      },
    },
    chart: {
      width: "100%",
    },
    labels: props.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#020617"],
    markers: {
      size: 5,
    },
    yaxis: {
      min: 0,
    },
  };

  return (
    <div>
      <ApexChart
        options={options}
        series={[
          {
            name: "Number Of Businesses",
            data: props.series,
            color: "blue",
          },
        ]}
        type="line"
        width={"100%"}
        height={400}
      />
    </div>
  );
};

export default LineChart;
