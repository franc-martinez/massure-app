import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { TRANSPORT_COLORS } from "@/constants/colors";

const TransportDistributionChart = ({
  data,
}: {
  data: { [key: string]: number }[];
}) => {
  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">Transport Mode Distribution by Year</p>
        <p className="text-md">
          Breakdown of emissions by transport mode across years
        </p>
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} kg CO₂`} />
            <Legend />
            {Object.entries(TRANSPORT_COLORS).map(([key, color]) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={color}
                strokeWidth={1}
                name={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransportDistributionChart;
