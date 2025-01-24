// components
import { PageBreadcrumb } from "../../components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuarterlyOverview } from "./components/QuarterOverview";
import { AnnualOverview } from "./components/AnnualOverview";
import { ReportDownload } from "./components/ReportDownload";
import { CommutingProvider } from "@/context/CommutingContext";
import { DataEntrySection } from "./components/DataEntrySection";
import { QuarterSelector } from "./components/QuarterSelector";
import { MultiYearOverview } from "./components/MultiYearOverview";
import { Toaster } from "@/components/ui/toaster";

const Gauges = () => {
  return (
    <>
      <PageBreadcrumb
        title="Gauges"
        name="Gauges"
        breadCrumbItems={["Gauges"]}
      />

      <CommutingProvider>
        <div className="container mx-auto">
          <Toaster />
          <Tabs defaultValue="data-entry" className="space-y-4">
            <TabsList className="h-12 p-1.5">
              <TabsTrigger value="data-entry" className="px-4 py-2.5">
                Data Entry
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="px-4 py-2.5">
                Quarterly Overview
              </TabsTrigger>
              <TabsTrigger value="annual" className="px-4 py-2.5">
                Annual Overview
              </TabsTrigger>
              <TabsTrigger value="multi-year" className="px-4 py-2.5">
                Overview
              </TabsTrigger>
              <TabsTrigger value="report" className="px-4 py-2.5">
                Download Report
              </TabsTrigger>
            </TabsList>

            <TabsContent value="data-entry" className="space-y-4">
              <QuarterSelector />
              <DataEntrySection />
            </TabsContent>

            <TabsContent value="quarterly" className="space-y-4">
              <QuarterSelector />
              <QuarterlyOverview />
            </TabsContent>

            <TabsContent value="annual" className="space-y-4">
              <QuarterSelector showQuarter={false} />
              <AnnualOverview />
            </TabsContent>

            <TabsContent value="multi-year">
              <MultiYearOverview />
            </TabsContent>

            <TabsContent value="report" className="space-y-4">
              <QuarterSelector showQuarter={false} />
              <ReportDownload />
            </TabsContent>
          </Tabs>
        </div>
      </CommutingProvider>
    </>
  );
};

export default Gauges;
