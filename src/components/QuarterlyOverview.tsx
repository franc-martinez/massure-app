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
  Pie,
  PieChart,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useCommuting } from "@/context/CommutingContext";
import { calculateEmissions, TransportMode } from "@/constants/emissions";
import { QuarterSelector } from "./QuarterSelector";
import { QUARTER_COLORS, TRANSPORT_COLORS } from "@/constants/colors";

export function QuarterlyOverview() {
  const {
    state: { data, selectedQuarter },
  } = useCommuting();

  const emissionsData = useMemo(() => {
    return Object.keys(data[selectedQuarter]).map((key) => ({
      key,
      name: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      value: calculateEmissions(
        key as TransportMode,
        data[selectedQuarter][key as TransportMode] as number
      ),
    }));
  }, [data, selectedQuarter]);

  return (
    <div className="grid gap-6">
      <QuarterSelector />

      <Card>
        <CardHeader>
          <CardTitle>CO2 Emissions by Transport Mode</CardTitle>
          <CardDescription>{selectedQuarter} 2024 Overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emissionsData}>
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(label) =>
                    label.length > 7 ? `${label.substring(0, 7)}...` : label
                  }
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  name="name"
                  fill={QUARTER_COLORS[selectedQuarter]}
                />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer className="px-16" width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emissionsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {emissionsData.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={TRANSPORT_COLORS[item.key as TransportMode]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emissions Data</CardTitle>
          <CardDescription>Detailed quarterly breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transport Mode</TableHead>
                <TableHead>CO2 Emissions</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emissionsData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>kg CO2</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>
                  {Math.round(
                    emissionsData.reduce((sum, item) => sum + item.value, 0) *
                      1000
                  ) / 1000}
                </TableCell>
                <TableCell>kg CO2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
