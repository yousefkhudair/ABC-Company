import { z } from "zod";

export const flightSearch = z.object({
  tripType: z.enum(["roundTrip", "oneWay"]),
  origin: z.string().min(3),
  destination: z.string().min(3),
  departDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
});

export const flightStatus = z.object({
  flightNumber: z.string().min(2),
  date: z.string(),
});
