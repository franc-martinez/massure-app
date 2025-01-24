import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { CommutingData } from ".";

const EmissionsTrendChart = ({ data }: { data: CommutingData }) => (
  <div className="card p-6">
    <div>
      <p className="text-lg font-medium mb-2">Annual CO2 Emissions Trend</p>
      <p className="text-md">Total emissions per quarter</p>
    </div>
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={Object.keys(data).map((key) => ({
            ...data[key],
            quarter: key,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#196b24"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default EmissionsTrendChart;
