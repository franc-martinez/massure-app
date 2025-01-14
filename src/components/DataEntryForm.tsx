import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useCommuting } from "../context/CommutingContext";
import { EMISSION_FACTORS, TransportMode } from "../constants/emissions";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  publicTransportMix: z.string().min(1),
  cyclingAndWorking: z.string().min(1),
  passengerCar: z.string().min(1),
  gasolineCar: z.string().min(1),
  dieselCar: z.string().min(1),
  hybridCar: z.string().min(1),
  electricCar: z.string().min(1),
  airplaneEurope: z.string().min(1),
});

const transportMetadata = {
  publicTransportMix: {
    description: "Public transportation including buses and trains",
    details: "Average occupancy rate: 40%",
    category: "Medium (120g CO₂/km)",
  },
  cyclingAndWorking: {
    description: "Non-motorized transportation",
    details: "Zero direct emissions",
    category: "Low (0g CO₂/km)",
  },
  passengerCar: {
    description: "Standard passenger vehicles",
    details: "Average occupancy: 1.5 persons",
    category: "High (193g CO₂/km)",
  },
  gasolineCar: {
    description: "Gasoline-powered vehicles",
    details: "Standard fuel efficiency",
    category: "High (204g CO₂/km)",
  },
  dieselCar: {
    description: "Diesel-powered vehicles",
    details: "Standard fuel efficiency",
    category: "High (180g CO₂/km)",
  },
  hybridCar: {
    description: "Hybrid electric vehicles",
    details: "Combined power sources",
    category: "Medium (137g CO₂/km)",
  },
  electricCar: {
    description: "Fully electric vehicles",
    details: "Grid electricity powered",
    category: "Low (69g CO₂/km)",
  },
  airplaneEurope: {
    description: "European air travel",
    details: "Short to medium-haul flights",
    category: "Very High (220g CO₂/km)",
  },
};

type EntryData = {
  value: number;
  status: "draft" | "pending" | "approved" | "finalized";
};

export function DataEntryForm() {
  const { state, dispatch } = useCommuting();
  const currentData = useMemo(
    () => state.data[state.selectedYear]?.[state.selectedQuarter] || {},
    [state.data, state.selectedQuarter, state.selectedYear]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicTransportMix: currentData.publicTransportMix?.value?.toString() || "0",
      cyclingAndWorking: currentData.cyclingAndWorking?.value?.toString() || "0",
      passengerCar: currentData.passengerCar?.value?.toString() || "0",
      gasolineCar: currentData.gasolineCar?.value?.toString() || "0",
      dieselCar: currentData.dieselCar?.value?.toString() || "0",
      hybridCar: currentData.hybridCar?.value?.toString() || "0",
      electricCar: currentData.electricCar?.value?.toString() || "0",
      airplaneEurope: currentData.airplaneEurope?.value?.toString() || "0",
    },
  });

  useEffect(() => {
    form.reset({
      publicTransportMix: currentData.publicTransportMix?.value?.toString() || "0",
      cyclingAndWorking: currentData.cyclingAndWorking?.value?.toString() || "0",
      passengerCar: currentData.passengerCar?.value?.toString() || "0",
      gasolineCar: currentData.gasolineCar?.value?.toString() || "0",
      dieselCar: currentData.dieselCar?.value?.toString() || "0",
      hybridCar: currentData.hybridCar?.value?.toString() || "0",
      electricCar: currentData.electricCar?.value?.toString() || "0",
      airplaneEurope: currentData.airplaneEurope?.value?.toString() || "0",
    });
  }, [state.selectedYear, state.selectedQuarter, currentData, form]);

  const handleSubmit = (mode: TransportMode, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      dispatch({
        type: "UPDATE_DATA",
        payload: {
          year: state.selectedYear,
          quarter: state.selectedQuarter,
          mode,
          value: numValue,
          status: "draft",
        },
      });
      toast({
        title: "Draft Saved",
        description: `${mode
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) =>
            str.toUpperCase()
          )} draft data has been saved for ${state.selectedQuarter} ${
          state.selectedYear
        }.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Enter Transport Data</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {state.selectedQuarter} {state.selectedYear}
            </p>
          </div>
          <Badge variant="outline" className="text-base font-semibold">
            {state.companyName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-8">
            {(Object.keys(EMISSION_FACTORS) as TransportMode[]).map((mode) => {
              const entryData = currentData[mode] as EntryData | undefined;
              const metadata = transportMetadata[mode];

              return (
                <FormField
                  key={mode}
                  control={form.control}
                  name={mode}
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <FormLabel className="flex items-center gap-2 text-base">
                          {mode
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                          {entryData?.status && (
                            <span
                              className={cn(
                                "text-xs px-2 py-0.5 rounded-full",
                                {
                                  "bg-yellow-100 text-yellow-800":
                                    entryData.status === "draft",
                                  "bg-blue-100 text-blue-800":
                                    entryData.status === "pending",
                                  "bg-green-100 text-green-800":
                                    entryData.status === "approved",
                                  "bg-purple-100 text-purple-800":
                                    entryData.status === "finalized",
                                }
                              )}
                            >
                              {entryData.status}
                            </span>
                          )}
                        </FormLabel>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{metadata.category}</Badge>
                          <span>•</span>
                          <span>{metadata.details}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex space-x-2">
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                                disabled={entryData?.status === "finalized"}
                              />
                            </FormControl>
                            <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                              km
                            </span>
                          </div>
                          <FormDescription className="mt-1">
                            {metadata.description}
                          </FormDescription>
                          <FormMessage />
                        </div>
                        <Button
                          type="button"
                          onClick={() => handleSubmit(mode, field.value)}
                          disabled={entryData?.status === "finalized"}
                          variant={
                            entryData?.status === "draft"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {entryData?.status === "draft"
                            ? "Update Draft"
                            : "Save as Draft"}
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
