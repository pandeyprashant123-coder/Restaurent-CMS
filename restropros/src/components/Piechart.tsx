import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Dummy data for subscriber distribution
const data = [
  { name: "Basic", value: 50 }, // Example: 50 subscribers for Basic
  { name: "Standard", value: 30 }, // Example: 30 subscribers for Standard
  { name: "Enterprise", value: 20 }, // Example: 20 subscribers for Enterprise
];

// Colors for the pie chart slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Piechart: React.FC = () => {
  return (
    <div className="w-1/3 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-bold mb-4">Plan Distribution</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            cx="120"
            cy="200"
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Piechart;
