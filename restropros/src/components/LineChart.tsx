import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface LineChartProps {
  dataPoints: number[]; // Array of subscriber numbers
  labels: string[]; // Array of time labels (e.g., months or dates)
}

const SubscriberLineChart: React.FC<LineChartProps> = ({
  dataPoints,
  labels,
}) => {
  // Prepare data for the chart
  const data = labels.map((label, index) => ({
    name: label,
    subscribers: dataPoints[index],
  }));

  return (
    <div className=" w-full bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-bold mb-4">Subscriber Growth</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="subscribers"
            stroke="#4CAF50" // Line color
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriberLineChart;
