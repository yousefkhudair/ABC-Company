import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Flight search schema
const flightSearch = z.object({
  tripType: z.enum(["roundTrip", "oneWay"]),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  departDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
});

export default function BookingForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [departDateOpen, setDepartDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(flightSearch),
    defaultValues: {
      tripType: "roundTrip",
      passengers: 1,
      origin: "",
      destination: "",
      departDate: format(startOfDay(new Date()), "yyyy-MM-dd"),
      returnDate: format(startOfDay(new Date()), "yyyy-MM-dd"),
    },
  });

  const handleDateSelect = (date, onChange) => {
    if (!date) return;
    const selectedDate = startOfDay(date);
    onChange(format(selectedDate, "yyyy-MM-dd"));
  };

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to search flights");

      toast({
        title: "Search successful",
        description: "Redirecting to flight selection...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search flights. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="tripType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center space-x-4 pt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roundTrip" id="roundTrip" />
                    <label
                      htmlFor="roundTrip"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Round trip
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oneWay" id="oneWay" />
                    <label
                      htmlFor="oneWay"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      One way
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="origin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="City or airport" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="City or airport" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="departDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Depart</FormLabel>
                <Popover open={departDateOpen} onOpenChange={setDepartDateOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(parseISO(field.value), "MMM d, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? parseISO(field.value) : undefined}
                      onSelect={(date) => {
                        handleDateSelect(date, field.onChange);
                        setDepartDateOpen(false);
                      }}
                      disabled={(date) =>
                        date < startOfDay(new Date()) || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("tripType") === "roundTrip" && (
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Return</FormLabel>
                  <Popover open={returnDateOpen} onOpenChange={setReturnDateOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(parseISO(field.value), "MMM d, yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? parseISO(field.value) : undefined}
                        onSelect={(date) => {
                          handleDateSelect(date, field.onChange);
                          setReturnDateOpen(false);
                        }}
                        disabled={(date) =>
                          date < parseISO(form.watch("departDate")) ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="passengers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passengers</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={9}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          Search flights
        </Button>
      </form>
    </Form>
  );
}