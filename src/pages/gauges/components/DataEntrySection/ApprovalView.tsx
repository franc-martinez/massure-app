import { EntryData, useCommuting } from "@/context/CommutingContext";
import { EMISSION_FACTORS, TransportMode } from "@/constants/emissions";
import { Check, X, Undo } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export function ApprovalView() {
  const { state, dispatch } = useCommuting();
  const currentData =
    state.data[state.selectedYear]?.[state.selectedQuarter] || {};

  const handleApprove = (mode: string) => {
    dispatch({
      type: "APPROVE_DATA",
      payload: {
        year: state.selectedYear,
        quarter: state.selectedQuarter,
        mode,
        approvedBy: "Current User",
      },
    });
    toast({
      title: "Data Approved",
      description: `${mode
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) =>
          str.toUpperCase()
        )} data has been approved for ${state.selectedQuarter} ${
        state.selectedYear
      }.`,
    });
  };

  const handleReject = (mode: string) => {
    dispatch({
      type: "REJECT_DATA",
      payload: {
        year: state.selectedYear,
        quarter: state.selectedQuarter,
        mode,
        approvedBy: "Current User",
      },
    });
    toast({
      title: "Data Rejected",
      description: `${mode
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) =>
          str.toUpperCase()
        )} data has been rejected for ${state.selectedQuarter} ${
        state.selectedYear
      }.`,
      variant: "destructive",
    });
  };

  const handleUndo = (mode: string) => {
    dispatch({
      type: "UNDO_DATA",
      payload: {
        year: state.selectedYear,
        quarter: state.selectedQuarter,
        mode,
      },
    });
    toast({
      title: "Approval Undone",
      description: `Approval for ${mode
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())} data has been undone for ${
        state.selectedQuarter
      } ${state.selectedYear}.`,
    });
  };

  return (
    <div className="card p-6">
      <div>
        <p className="text-lg font-medium mb-2">Approve Data Entries</p>
        <p className="text-md">
          Review and approve draft entries for {state.selectedQuarter}{" "}
          {state.selectedYear}
        </p>
      </div>
      <div className="mt-4 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transport Mode</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Modified</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(EMISSION_FACTORS) as TransportMode[]).map((mode, index) => {
              const entryData = currentData[mode] as EntryData;
              if (!entryData || entryData.status === "finalized") return null;

              return (
                <tr key={mode} className={index % 2 === 0 ? "bg-white" : "bg-green-50"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {mode
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{entryData.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{EMISSION_FACTORS[mode].unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full capitalize",
                        {
                          "bg-yellow-100 text-yellow-800":
                            entryData.status === "draft",
                          "bg-blue-100 text-blue-800":
                            entryData.status === "pending",
                          "bg-green-100 text-green-800":
                            entryData.status === "approved",
                        }
                      )}
                    >
                      {entryData.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {entryData.lastModified.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {entryData.status === "draft" && (
                      <div className="flex space-x-2">
                        <button
                          className="btn btn-sm"
                          onClick={() => handleApprove(mode)}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </button>
                        <button
                          className="w-8 h-8 p-0"
                          onClick={() => handleReject(mode)}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    )}
                    {entryData.status === "approved" && (
                      <div className="flex space-x-2">
                        <button
                          className="w-8 h-8 p-0"
                          onClick={() => handleUndo(mode)}
                        >
                          <Undo className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
