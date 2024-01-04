"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type PieChartProps = {
  title: string;
  labels: string[];
  series: number[];
};

const PieChart = (props: PieChartProps) => {
  const options = {
    title: {
      text: props.title,
      style: {
        color: "gray",
      },
    },
    labels: props.labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      labels: {
        colors: "gray",
      },
    },
    colors: ["#FF1654", "#247BA0", "#70C1B3", "#B2DBBF", "#F3FFBD"],
    stroke: {
      colors: [],
    },
  };

  return (
    <div>
      <ApexChart
        options={options}
        series={props.series}
        type="pie"
        width={500}
        height={320}
      />
    </div>
  );
};

export default PieChart;
