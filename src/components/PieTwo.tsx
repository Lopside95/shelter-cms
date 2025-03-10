"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export type DataItem = {
  name: string;
  value: number;
  color: string;
};

//eslint-disable-next-line
const PieTwo = (data: DataItem[]) => {
  console.log("data", data);

  const data01 = [
    { name: "Group A", value: 400, color: "#0e320d" },
    { name: "Group B", value: 300, color: "#1f77b4" },
    { name: "Group C", value: 300, color: "#ff7f0e" },
    { name: "Group D", value: 200, color: "#2ca02c" },
    { name: "Group E", value: 278, color: "#d62728" },
    { name: "Group F", value: 189, color: "#9467bd" },
  ];

  const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
  ];

  if (!data.length) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {/* <Pie
        dataKey="value"
        data={data02}
        cx={500}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill="#82ca9d"
      /> */}
        {/* <Tooltip /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieTwo;
