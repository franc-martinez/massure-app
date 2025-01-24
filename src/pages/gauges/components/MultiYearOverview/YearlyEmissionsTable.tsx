import { TRANSPORT_COLORS } from "@/constants/colors";

const YearlyEmissionTable = ({
  data,
}: {
  data: { [key: string]: number }[];
}) => {
  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">Year-over-Year Comparison</p>
        <p className="text-md">Annual totals and percentage changes</p>
      </div>
      <div className="mt-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
              {Object.keys(TRANSPORT_COLORS).map((key) => (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase" key={key}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Emissions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Unit
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr
                key={data.year}
                className={index % 2 === 0 ? "bg-white" : "bg-green-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{data.year}</td>
                {Object.keys(TRANSPORT_COLORS).map((key) => (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-right" key={key}>
                    {data[key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-right">{data.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 text-right">kg CO₂</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearlyEmissionTable;
