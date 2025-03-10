import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: text("flight_number").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  price: integer("price").notNull(),
  seatsAvailable: integer("seats_available").notNull(),
});

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

export type FlightSearch = z.infer<typeof flightSearch>;
export type FlightStatus = z.infer<typeof flightStatus>;
export type Flight = typeof flights.$inferSelect;
