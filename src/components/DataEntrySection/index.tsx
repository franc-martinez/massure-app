import { DataEntryForm } from "./DataEntryForm";
import { ApprovalView } from "./ApprovalView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useCommuting } from "../../context/CommutingContext";

export function DataEntrySection() {
  const { state } = useCommuting();
  const currentData =
    state.data[state.selectedYear]?.[state.selectedQuarter] || {};

  const draftCount = Object.values(currentData).filter(
    (item) => item?.status === "draft"
  ).length;

  return (
    <div className="space-y-6 pb-8">
      <Tabs defaultValue="fill-in" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="fill-in">Fill in</TabsTrigger>
          <TabsTrigger value="approve">
            <div className="relative">
              Approve
              {!!draftCount && (
                <div className="absolute -right-5 top-0 text-white text-[10px] px-1.5 bg-red-500 h-3.5 flex items-center justify-center rounded-full">
                  {draftCount}
                </div>
              )}
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="fill-in">
          <DataEntryForm />
        </TabsContent>
        <TabsContent value="approve">
          <ApprovalView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
