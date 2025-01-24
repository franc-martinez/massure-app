import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TotalEmissionsTrendChart = ({
  data,
}: {
  data: { [key: string]: number }[];
}) => {
  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">Total CO2 Emissions Trend</p>
        <p className="text-md">Year-over-year emissions comparison</p>
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} kg CO₂`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#196b24"
              strokeWidth={4}
              name="Total Emissions"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalEmissionsTrendChart;
