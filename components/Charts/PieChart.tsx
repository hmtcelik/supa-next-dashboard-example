"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type PieChartProps = {
  title: string;
  labels: string[];
  series: number[];
};

const PieChart = (props: PieChartProps) => {
  const options: ApexCharts.ApexOptions = {
    title: {
      text: props.title,
      style: {
        color: "gray",
      },
      align: "center",
    },
    chart: {
      width: "100%",
      toolbar: {
        show: false,
      },
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
    markers: {
      size: 5,
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div>
      <ApexChart
        options={options}
        series={props.series}
        type="pie"
        width="100%"
        height={450}
      />
    </div>
  );
};

export default PieChart;
