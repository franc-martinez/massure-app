import { CommutingData, useCommuting } from "@/context/CommutingContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { calculateEmissions, TransportMode } from "@/constants/emissions";
import { QUARTER_COLORS, TRANSPORT_COLORS } from "@/constants/colors";

// Calculate percentages for stacked bar chart
const calculatePercentages = (data: CommutingData) => {
  const categories = Object.keys(data.Q1);

  return categories.map((category) => {
    const total =
      +data.Q1[category as TransportMode] +
        +data.Q2[category as TransportMode] +
        +data.Q3[category as TransportMode] +
        +data.Q4[category as TransportMode] || 1;

    return {
      category: category
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      Q1: (+data.Q1[category as TransportMode] * 100) / total,
      Q2: (+data.Q2[category as TransportMode] * 100) / total,
      Q3: (+data.Q3[category as TransportMode] * 100) / total,
      Q4: (+data.Q4[category as TransportMode] * 100) / total,
    };
  });
};

const transformDataForComparison = (data: CommutingData) => {
  const categories = Object.keys(data.Q1);
  categories.pop();
  return categories.map((category) => ({
    category: category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    Q1: data.Q1[category as TransportMode],
    Q2: data.Q2[category as TransportMode],
    Q3: data.Q3[category as TransportMode],
    Q4: data.Q4[category as TransportMode],
  }));
};

export function AnnualOverview() {
  const {
    state: { data },
  } = useCommuting();

  const processedData = Object.entries(data).reduce(
    (res, [quarter, commutings]) => {
      const processedQuarterData = Object.entries(commutings).reduce(
        (acc, [mode, value]) => {
          acc[mode as TransportMode] = calculateEmissions(
            mode as TransportMode,
            value as number
          );
          return acc;
        },
        {} as Record<TransportMode, number>
      );

      return {
        ...res,
        [quarter]: {
          ...processedQuarterData,
          total:
            Math.round(
              Object.values(processedQuarterData).reduce(
                (sum, val) => sum + val,
                0
              ) * 1000
            ) / 1000,
        },
      };
    },
    {} as CommutingData
  );

  const percentageData = calculatePercentages(processedData);
  const comparisonData = transformDataForComparison(processedData);

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Transport Mode Distribution by Quarter</CardTitle>
          <CardDescription>
            Percentage distribution of CO2 emissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={percentageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => `${(+value).toFixed(2)}%`} />
              <Legend />
              {Object.entries(QUARTER_COLORS).map(([quarter, color]) => (
                <Bar key={quarter} stackId="a" dataKey={quarter} fill={color} name={quarter} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cumulative CO2 Emissions Over Time</CardTitle>
          <CardDescription>
            Quarterly progression of emissions by transport mode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={Object.keys(processedData).map((key) => ({
                ...processedData[key],
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
                  name={key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quarterly Comparison by Transport Mode</CardTitle>
          <CardDescription>
            Direct comparison of emissions across quarters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.entries(QUARTER_COLORS).map(([quarter, color]) => (
                <Bar key={quarter} dataKey={quarter} fill={color} name={quarter} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Annual CO2 Emissions Trend</CardTitle>
          <CardDescription>Total emissions per quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={Object.keys(processedData).map((key) => ({
                ...processedData[key],
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
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Annual Emissions</CardTitle>
            <CardDescription>
              Detailed breakdown of CO2 emissions (in kg) by transport mode and quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transport Mode</TableHead>
                  {Object.keys(processedData).map((quarter) => (
                    <TableHead key={quarter}>{quarter}</TableHead>
                  ))}
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(Object.keys(processedData.Q1) as TransportMode[]).map(
                  (mode) => (
                    <TableRow key={mode}>
                      <TableCell>
                        {mode
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </TableCell>
                      {Object.entries(processedData).map(([quarter, data]) => (
                        <TableCell key={quarter}>{data[mode]}</TableCell>
                      ))}
                      <TableCell>
                        {Math.round(
                          Object.values(processedData).reduce(
                            (sum, data) => sum + data[mode],
                            0
                          ) * 1000
                        ) / 1000}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
