"use client";

import { useState, useEffect } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "@/components/ui/pie-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieTwo from "./PieTwo";
// import { ResponsiveContainer } from "recharts"

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface AnimatedPieChartProps {
  data: DataItem[];
  title?: string;
  animationDuration?: number;
}

const MyPieChart = ({
  data,
  title = "Distribution Chart",
  animationDuration = 800,
}: AnimatedPieChartProps) => {
  // State to control animation
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate total for percentage display
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Start animation on component mount
  useEffect(() => {
    setIsAnimating(true);
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      setIsAnimating(false);
    };
  }, [animationDuration]);

  //eslint-disable-next-line
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = ((item.value / total) * 100).toFixed(1);

      return (
        <div className="bg-background p-3 border rounded-lg shadow-sm">
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            {item.value} ({percentage}%)
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>{/* <CardTitle>{title}</CardTitle> */}</CardHeader>
      <CardContent className="bg-blue-400">
        <div className="w-60 h-72">{/* <PieTwo /> */}</div>
      </CardContent>
    </Card>
  );
};

export default MyPieChart;

// <RechartsPieChart className="bg-yellow-300">
// <Pie
//   data={data}
//   cx="50%"
//   cy="50%"
//   labelLine={false}
//   outerRadius={100}
//   fill="#8884d8"
//   dataKey="value"
//   startAngle={90}
//   endAngle={isAnimating ? 90 - 360 * animationProgress : -270}
//   animationBegin={0}
//   animationDuration={0}
// >
//   {data.map((entry, index) => (
//     <Cell key={`cell-${index}`} fill={entry.color} />
//   ))}
// </Pie>
// <Tooltip content={<CustomTooltip />} />
// <Legend
//   layout="horizontal"
//   verticalAlign="bottom"
//   align="center"
//   formatter={(value) => {
//     const item = data.find((d) => d.name === value);
//     const percentage = item
//       ? ((item.value / total) * 100).toFixed(1)
//       : "0";
//     return (
//       <span className="text-sm">
//         {value} ({percentage}%)
//       </span>
//     );
//   }}
// />
// </RechartsPieChart>
