import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { DataEntryForm } from "./components/DataEntryForm";
import { QuarterlyOverview } from "./components/QuarterlyOverview";
import { AnnualOverview } from "./components/AnnualOverview";
import { ReportDownload } from "./components/ReportDownload";
import { CommutingProvider } from "./context/CommutingContext";

function App() {
  return (
    <CommutingProvider>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">
          Commuting CO2 Emissions Dashboard
        </h1>

        <Tabs defaultValue="data-entry" className="space-y-4">
          <TabsList className="h-12 p-1.5">
            <TabsTrigger value="data-entry" className="px-4 py-2.5">Data Entry</TabsTrigger>
            <TabsTrigger value="quarterly" className="px-4 py-2.5">Quarterly Overview</TabsTrigger>
            <TabsTrigger value="annual" className="px-4 py-2.5">Annual Overview</TabsTrigger>
            <TabsTrigger value="report" className="px-4 py-2.5">Download Report</TabsTrigger>
          </TabsList>

          <TabsContent value="data-entry">
            <DataEntryForm />
          </TabsContent>

          <TabsContent value="quarterly">
            <QuarterlyOverview />
          </TabsContent>

          <TabsContent value="annual">
            <AnnualOverview />
          </TabsContent>

          <TabsContent value="report">
            <ReportDownload />
          </TabsContent>
        </Tabs>
      </div>
    </CommutingProvider>
  );
}

export default App;
