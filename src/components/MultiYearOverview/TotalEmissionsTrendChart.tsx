import { YearData } from "@/context/CommutingContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>Total CO2 Emissions Trend</CardTitle>
        <CardDescription>Year-over-year emissions comparison</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default TotalEmissionsTrendChart;
