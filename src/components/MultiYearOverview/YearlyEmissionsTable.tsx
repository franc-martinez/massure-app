import { TRANSPORT_COLORS } from "@/constants/colors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const YearlyEmissionTable = ({
  data,
}: {
  data: { [key: string]: number }[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Year-over-Year Comparison</CardTitle>
        <CardDescription>Annual totals and percentage changes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-green-700 hover:bg-green-600">
              <TableHead className="text-white font-bold">Year</TableHead>
              {Object.keys(TRANSPORT_COLORS).map((key) => (
                <TableHead className="text-white font-bold text-right" key={key}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </TableHead>
              ))}
              <TableHead className="text-white font-bold text-right">
                Total Emissions
              </TableHead>
              <TableHead className="text-white font-bold text-right">
                Unit
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((data, index) => (
              <TableRow
                key={data.year}
                className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
              >
                <TableCell>{data.year}</TableCell>
                {Object.keys(TRANSPORT_COLORS).map((key) => (
                  <TableCell key={key} className="text-right">
                    {data[key]}
                  </TableCell>
                ))}
                <TableCell className="text-right">{data.total}</TableCell>
                <TableCell className="text-right">kg CO₂</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default YearlyEmissionTable;
