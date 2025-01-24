import { TRANSPORT_COLORS } from "@/constants/colors";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  CartesianGrid,
  Area,
} from "recharts";
import { CommutingData } from ".";

const EmissionsOvertimeChart = ({ data }: { data: CommutingData }) => (
  <div className="card p-6">
    <div>
      <p className="text-lg font-medium mb-2">Cumulative CO2 Emissions Over Time</p>
      <p className="text-md">
        Quarterly progression of emissions by transport mode
      </p>
    </div>
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={Object.keys(data).map((key) => ({
            ...data[key],
            quarter: key,
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.entries(TRANSPORT_COLORS).map(([key, color]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={color}
              fillOpacity={1}
              name={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default EmissionsOvertimeChart;
