import { TransportMode } from "@/constants/emissions";
import { CommutingData } from ".";

const AnnualEmissionsTable = ({ data: processedData }: { data: CommutingData }) => {
  return (
    <div className="col-span-2">
      <div className="card p-6">
        <div className="text-md">
          <p className="text-lg font-medium mb-2">Annual Emissions</p>
          <p>
            Detailed breakdown of CO2 emissions (in kg) by transport mode and
            quarter
          </p>
        </div>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transport Mode
                </th>
                {Object.keys(processedData).map((quarter) => (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" key={quarter}>
                    {quarter}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(processedData.Q1) as TransportMode[]).map(
                (mode, index) => (
                  <tr
                    key={mode}
                    className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {mode
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </td>
                    {Object.entries(processedData).map(([quarter, data]) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200" key={quarter}>{data[mode]}</td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {Math.round(
                        Object.values(processedData).reduce(
                          (sum, data) => sum + (data[mode] || 0),
                          0
                        ) * 1000
                      ) / 1000}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnnualEmissionsTable;
