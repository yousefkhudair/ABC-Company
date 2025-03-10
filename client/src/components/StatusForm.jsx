import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { flightStatus } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function StatusForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchType, setSearchType] = useState('cities');

  const form = useForm({
    resolver: zodResolver(flightStatus),
    defaultValues: {
      flightNumber: "",
      date: format(startOfDay(new Date()), "yyyy-MM-dd"),
    },
  });

  const handleDateSelect = (date, onChange) => {
    if (!date) return;
    // Ensure we're working with the start of the selected day
    const selectedDate = startOfDay(date);
    onChange(format(selectedDate, "yyyy-MM-dd"));
  };

  async function onSubmit(data) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/flights/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to get flight status");

      toast({
        title: "Success",
        description: "Retrieving flight status...",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get flight status. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RadioGroup
          value={searchType}
          onValueChange={(value) => setSearchType(value)}
          className="flex items-center space-x-4 pt-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cities" id="cities" />
            <label
              htmlFor="cities"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Cities
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flightNumber" id="flightNumber" />
            <label
              htmlFor="flightNumber"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Flight number
            </label>
          </div>
        </RadioGroup>

        {searchType === 'cities' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem>
              <FormControl>
                <Input placeholder="City or airport" />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormControl>
                <Input placeholder="City or airport" />
              </FormControl>
            </FormItem>
          </div>
        ) : (
          <FormField
            control={form.control}
            name="flightNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter flight number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          Search
        </Button>
      </form>
    </Form>
  );
}
