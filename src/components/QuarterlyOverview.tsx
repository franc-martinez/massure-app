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
  Tooltip,
  LabelList,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useCommuting } from "@/context/CommutingContext";
import { calculateEmissions, TransportMode } from "@/constants/emissions";
import { TRANSPORT_COLORS } from "@/constants/colors";

function roundToTwoDecimals(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculatePercentages(
  data: Array<{ key: string; name: string; value: number }>
) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return data.map((item) => ({
    ...item,
    percentage: roundToTwoDecimals((item.value / total) * 100),
  }));
}

export function QuarterlyOverview() {
  const {
    state: { data, selectedQuarter, selectedYear },
  } = useCommuting();

  const emissionsData = useMemo(() => {
    return Object.keys(TRANSPORT_COLORS).map((key) => {
      let value = 0;

      if (
        data[selectedYear]?.[selectedQuarter]?.[key as TransportMode] &&
        data[selectedYear]?.[selectedQuarter]?.[key as TransportMode].status ===
          "approved"
      ) {
        value =
          data[selectedYear]?.[selectedQuarter]?.[key as TransportMode].value;
      }

      return {
        key,
        name: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        value: calculateEmissions(key as TransportMode, value),
      };
    });
  }, [data, selectedQuarter, selectedYear]);

  const [chartData, setChartData] = useState<
    Array<{ key: string; name: string; value: number; percentage: number }>
  >([]);

  useEffect(() => {
    setChartData(calculatePercentages(emissionsData));
  }, [emissionsData]);

  const total =
    Math.round(
      emissionsData.reduce((sum, item) => sum + item.value, 0) * 1000
    ) / 1000;

  return (
    <div className="grid gap-6">
      {!!total && (
        <Card>
          <CardHeader>
            <CardTitle>CO2 Emissions by Transport Mode</CardTitle>
            <CardDescription>{selectedQuarter} 2024 Overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={emissionsData}>
                  <XAxis dataKey="name" height={80} fontSize={14} angle={-32} textAnchor="end" />

                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="name" fill="#196b24" />
                </BarChart>
              </ResponsiveContainer>

              <ResponsiveContainer width="100%" height={400}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 20, right: 50, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{ fontSize: 14, width: 300 }}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} kg CO₂`, "Emissions"]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#8884d8"
                      minPointSize={2}
                      background={{ fill: "#f3f4f6" }}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={TRANSPORT_COLORS[entry.key as TransportMode]}
                        />
                      ))}
                      <LabelList
                        dataKey="percentage"
                        position="right"
                        content={({ x = 0, y = 0, width = 0, value = 0 }) => (
                          <text
                            x={+x + +width + (+value > 7 ? -45 : 4)}
                            y={+y + 21}
                            fill={+value > 7 ? "white" : "#6b7280"}
                            color="white"
                            fontSize={13}
                          >
                            {`${value}%`}
                          </text>
                        )}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Emissions Data</CardTitle>
          <CardDescription>Detailed quarterly breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full [&_td:nth-child(1)]:w-80 [&_td:nth-child(2)]:w-60">
            <TableHeader>
              <TableRow className="bg-green-700 hover:bg-green-600">
                <TableHead className="text-white font-bold">
                  Transport Mode
                </TableHead>
                <TableHead className="text-white font-bold">
                  CO2 Emissions
                </TableHead>
                <TableHead className="text-white font-bold">
                  Percentage
                </TableHead>
                <TableHead className="text-white font-bold">Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.map((row, index) => (
                <TableRow key={row.name} className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  <TableCell className="px-2">{row.name}</TableCell>
                  <TableCell className="px-2">{row.value}</TableCell>
                  <TableCell className="px-2">{row.percentage}%</TableCell>
                  <TableCell className="px-2">kg CO₂</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{total}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>kg CO2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
