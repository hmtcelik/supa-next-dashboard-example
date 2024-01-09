"use client";

import React, { useEffect, useState } from "react";
import { MONTHS } from "@/utils/enums/months";
import LineChart from "./LineChart";
import { getBusinessRatiosGivenMonth } from "@/services/Business";

const LineChartForm = () => {
  const [totals, setTotals] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    getBusinessRatiosGivenMonth(month)
      .then((res) => {
        console.log(res);
        setTotals(res.totals);
        setDates(res.dates);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [month]);

  return (
    <>
      <select
        className="py-3 px-4 block border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-gray-500 dark:text-gray-400 dark:focus:ring-gray-600"
        required
        defaultValue={month}
        onChange={(e) => setMonth(parseInt(e.target.value))}
      >
        {MONTHS.map((month) => (
          <option key={month.idx} value={month.idx}>
            {month.name}
          </option>
        ))}
      </select>
      <LineChart
        title={`Businesses Based in ${
          MONTHS[month].name
        } ${new Date().getFullYear()}`}
        series={totals}
        labels={dates}
      />
    </>
  );
};

export default LineChartForm;
