import { useEffect, useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { useCommuting } from "@/context/CommutingContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function QuarterSelector({
  showQuarter = true,
}: {
  showQuarter?: boolean;
}) {
  const { state, dispatch } = useCommuting();
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(
    parseInt(state.selectedYear)
  );
  const [open, setOpen] = useState(false);

  const years = Array.from({ length: 21 }, (_, i) => currentYear - 20 + i);
  const yearsMatrix = Array.from(
    { length: Math.ceil(years.length / 3) },
    (_, i) => years.slice(i * 3, i * 3 + 3)
  );

  useEffect(() => {
    setSelectedYear(parseInt(state.selectedYear));
  }, [state.selectedYear]);

  const handleYearSelect = (year: number) => {
    dispatch({ type: "SET_SELECTED_YEAR", payload: year.toString() });
    setOpen(false);
  };

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    dispatch({ type: "SET_SELECTED_YEAR", payload: newYear.toString() });
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    dispatch({ type: "SET_SELECTED_YEAR", payload: newYear.toString() });
  };

  return (
    <div className="card p-6">
      <div className="pt-6 space-y-4">
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Select Year
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevYear}
                disabled={selectedYear <= currentYear - 20}
                className="btn"
              >
                <i className="mgc_large_arrow_left_line" />
              </button>

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "justify-center text-center font-normal",
                      !selectedYear && "text-muted-foreground"
                    )}
                  >
                    {selectedYear}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <div className="p-3">
                    <div className="grid grid-cols-3 gap-2">
                      {yearsMatrix.map((row, i) => (
                        <div key={i} className="flex justify-center gap-2">
                          {row.map((year) => (
                            <button
                              key={year}
                              className="w-12"
                              onClick={() => handleYearSelect(year)}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <button
                onClick={handleNextYear}
                disabled={selectedYear >= currentYear}
                className="btn"
              >
                <i className="mgc_large_arrow_right_line" />
              </button>
            </div>
          </div>

          {selectedYear !== currentYear && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You are currently viewing data for {selectedYear}, which is not
                the current year.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {showQuarter && (
          <div className="flex gap-2">
            {quarters.map((quarter) => (
              <button
                key={quarter}
                className={`flex-1 btn btn-sm bg-primary text-white ${state.selectedQuarter === quarter ? 'bg-primary' : 'bg-secondary'}`}
                onClick={() =>
                  dispatch({ type: "SET_SELECTED_QUARTER", payload: quarter })
                }
              >
                {quarter}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
