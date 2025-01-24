import { QUARTER_COLORS, TRANSPORT_COLORS } from "@/constants/colors";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { CommutingData } from ".";
import { TransportMode } from "@/constants/emissions";

const transformDataForComparison = (data: CommutingData) => {
  const categories = Object.keys(TRANSPORT_COLORS);
  return categories.map((category) => ({
    category: category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    Q1: data?.Q1?.[category as TransportMode] || 0,
    Q2: data?.Q2?.[category as TransportMode] || 0,
    Q3: data?.Q3?.[category as TransportMode] || 0,
    Q4: data?.Q4?.[category as TransportMode] || 0,
  }));
};

const QuartlyComparisonChart = ({ data }: { data: CommutingData }) => {
  const comparisonData = transformDataForComparison(data);

  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">Quarterly Comparison by Transport Mode</p>
        <p className="text-md">
          Direct comparison of emissions across quarters
        </p>
      </div>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <XAxis
              dataKey="category"
              height={70}
              fontSize={14}
              angle={-32}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.entries(QUARTER_COLORS).map(([quarter, color]) => (
              <Bar
                key={quarter}
                dataKey={quarter}
                fill={color}
                name={quarter}
              />
            ))}
            {comparisonData.map((item) => (
              <ReferenceLine
                key={item.category}
                x={item.category}
                position="end"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuartlyComparisonChart;
