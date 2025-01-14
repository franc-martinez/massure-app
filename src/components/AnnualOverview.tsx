import { useCommuting } from "@/context/CommutingContext";
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
  LabelList,
  ReferenceLine,
} from "recharts";
import { calculateEmissions, TransportMode } from "@/constants/emissions";
import { QUARTER_COLORS, TRANSPORT_COLORS } from "@/constants/colors";

export interface CommutingData {
  [quarter: string]: {
    [mode: string]: number;
  };
}

// Calculate percentages for stacked bar chart
const calculatePercentages = (data: CommutingData) => {
  const categories = Object.keys(TRANSPORT_COLORS);

  return categories.map((category) => {
    const total =
      +(data?.Q1?.[category as TransportMode] || 0) +
        +(data?.Q2?.[category as TransportMode] || 0) +
        +(data?.Q3?.[category as TransportMode] || 0) +
        +(data?.Q4?.[category as TransportMode] || 0) || 1;

    return {
      category: category
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      Q1: (+(data?.Q1?.[category as TransportMode] || 0) * 100) / total,
      Q2: (+(data?.Q2?.[category as TransportMode] || 0) * 100) / total,
      Q3: (+(data?.Q3?.[category as TransportMode] || 0) * 100) / total,
      Q4: (+(data?.Q4?.[category as TransportMode] || 0) * 100) / total,
    };
  });
};

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

export function AnnualOverview() {
  const {
    state: { data, selectedYear },
  } = useCommuting();

  const processedData = ["Q1", "Q2", "Q3", "Q4"].reduce((res, quarter) => {
    const processedQuarterData = Object.keys(TRANSPORT_COLORS).reduce(
      (acc, mode) => {
        let value = 0;
        if (
          data[selectedYear]?.[quarter]?.[mode as TransportMode] &&
          data[selectedYear]?.[quarter]?.[mode as TransportMode].status ===
            "approved"
        ) {
          value = data[selectedYear]?.[quarter]?.[mode as TransportMode].value;
        }
        acc[mode as TransportMode] = calculateEmissions(
          mode as TransportMode,
          value
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
  }, {} as CommutingData);

  const total = Object.values(processedData).reduce(
    (sum, data) => sum + (data["total" as TransportMode] || 0),
    0
  );

  const percentageData = calculatePercentages(processedData);
  const comparisonData = transformDataForComparison(processedData);

  return (
    <div className="grid grid-cols-2 gap-6">
      {!!total && (
        <>
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
                  <XAxis dataKey="category" height={70} fontSize={14} angle={-32} textAnchor="end" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => `${(+value).toFixed(2)}%`} />
                  <Legend />

                  {Object.entries(QUARTER_COLORS).map(([quarter, color]) => (
                    <Bar
                      key={quarter}
                      stackId="a"
                      dataKey={quarter}
                      fill={color}
                      name={quarter}
                    >
                      <LabelList
                        dataKey={quarter}
                        content={({
                          x = 0,
                          y = 0,
                          width = 0,
                          height = 0,
                          value = 0,
                        }) => (
                          <text
                            x={+x + +width / 2}
                            y={+y + +height / 2 + 6}
                            fill="white"
                            color="white"
                            fontSize={13}
                            textAnchor="middle"
                          >
                            {!!value && `${Math.round(+value)}%`}
                          </text>
                        )}
                      />
                    </Bar>
                  ))}

                  {percentageData.map((item) => (
                    <ReferenceLine key={item.category} x={item.category} position="end" strokeWidth="2" strokeDasharray="3 3" />
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
                      fillOpacity={1}
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
                  <XAxis dataKey="category" height={70} fontSize={14} angle={-32} textAnchor="end" />
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
                    <ReferenceLine key={item.category} x={item.category} position="end" strokeWidth="2" strokeDasharray="3 3" />
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
                    stroke="#196b24"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Annual Emissions</CardTitle>
            <CardDescription>
              Detailed breakdown of CO2 emissions (in kg) by transport mode and
              quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-green-700 hover:bg-green-600">
                  <TableHead className="text-white font-bold">
                    Transport Mode
                  </TableHead>
                  {Object.keys(processedData).map((quarter) => (
                    <TableHead key={quarter} className="text-white font-bold">
                      {quarter}
                    </TableHead>
                  ))}
                  <TableHead className="text-white font-bold">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(Object.keys(processedData.Q1) as TransportMode[]).map(
                  (mode, index) => (
                    <TableRow
                      key={mode}
                      className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
                    >
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
                            (sum, data) => sum + (data[mode] || 0),
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
