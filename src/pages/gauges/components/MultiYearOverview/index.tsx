import { QuarterData, useCommuting } from "@/context/CommutingContext";
import {
  EMISSION_FACTORS,
  TransportMode,
  calculateEmissions,
} from "@/constants/emissions";
import TotalEmissionsTrendChart from "./TotalEmissionsTrendChart";
import TransportDistributionChart from "./TransportDistribution";
import YearlyEmissionTable from "./YearlyEmissionsTable";

export function MultiYearOverview() {
  const { state } = useCommuting();

  const currentYear = new Date().getFullYear();
  const yearlyData = new Array(6).fill(0).map((_, index) => {
    const year = currentYear - 5 + index;
    const yearData = state.data[year];
    let total = 0;
    const modeData = Object.keys(EMISSION_FACTORS).reduce((acc, mode) => {
      const modeTotal = yearData
        ? Math.round(
            Object.values(yearData).reduce(
              (sum: number, quarterData: QuarterData) =>
                sum +
                calculateEmissions(
                  mode as TransportMode,
                  quarterData[mode]?.value || 0
                ),
              0
            ) * 1000
          ) / 1000
        : 0;
      total += modeTotal;
      return { ...acc, [mode]: modeTotal };
    }, {});

    return {
      year,
      total: Math.round(total * 1000) / 1000,
      ...modeData,
    };
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      <TotalEmissionsTrendChart data={yearlyData} />
      <TransportDistributionChart data={yearlyData} />

      <div className="col-span-2">
        <YearlyEmissionTable data={yearlyData} />
      </div>
    </div>
  );
}
