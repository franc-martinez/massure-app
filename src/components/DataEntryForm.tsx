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
} from "./ui/form";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useCommuting } from "@/context/CommutingContext";
import { useEffect } from "react";
import { QuarterSelector } from "./QuarterSelector";

const formSchema = z.object({
  publicTransportMix: z.number().min(1),
  cyclingAndWorking: z.number().min(1),
  passengerCar: z.number().min(1),
  gasolineCar: z.number().min(1),
  dieselCar: z.number().min(1),
  hybridCar: z.number().min(1),
  electricCar: z.number().min(1),
  airplaneEurope: z.number().min(1),
});

export function DataEntryForm() {
  const {
    dispatch,
    state: { data, selectedQuarter },
  } = useCommuting();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicTransportMix: 0,
      cyclingAndWorking: 0,
      passengerCar: 0,
      gasolineCar: 0,
      dieselCar: 0,
      hybridCar: 0,
      electricCar: 0,
      airplaneEurope: 0,
    },
  });

  useEffect(() => {
    form.reset(data[selectedQuarter]);
  }, [form, selectedQuarter, data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        quarter: selectedQuarter,
        data: values,
      },
    });
  };

  const { isDirty, dirtyFields } = form.formState;
  const isFormChanged = isDirty && Object.keys(dirtyFields).length > 0;

  return (
    <div className="grid gap-2">
      <QuarterSelector />

      <Card>
        <CardHeader>
          <CardTitle>Enter Commuting Data for {selectedQuarter}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(data[selectedQuarter])
                  .map((key) => ({
                    name: key,
                    label: key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase()),
                  }))
                  .map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name as keyof z.infer<typeof formSchema>}
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              {...formField}
                              onChange={(e) =>
                                formField.onChange(+e.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={!isFormChanged}>
                  Submit Data
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
