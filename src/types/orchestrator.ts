import { z } from "zod";

// Constants for dropdowns
export const SYMBOLS = ["NIFTY", "BANKNIFTY"] as const;
export const DAYS = ["MON", "TUE", "WED", "THU", "FRI"] as const;
export const FREQS = ["WEEKLY", "MONTHLY"] as const;
export const OPTION_TYPES = ["CE", "PE"] as const;
export const TRANSACTION_TYPES = ["BUY", "SELL"] as const;

// Schema for validating the form
export const backtestSchema = z.object({
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  capital: z.coerce.number().min(1),
  lot_size: z.coerce.number().min(1),

  position: z.object({
    per_day_positions_threshold: z.coerce.number().min(1),

    entry: z.object({
      time: z.string().min(1),
    }),

    exit: z.object({
      time: z.string().min(1),
      movement: z.coerce.number().optional(),
    }),

    focus: z.object({
      symbol: z.enum(SYMBOLS),
      step: z.coerce.number().min(1),
      expiry: z.object({
        weekday: z.coerce.number().min(0).max(6), // 0-6 for days of the week
        frequency: z.enum(FREQS),
      }),
    }),

    legs: z
      .array(
        z.object({
          strike: z.object({
            offset: z.coerce.number(),
          }),
          type: z.enum(OPTION_TYPES),
          transaction: z.enum(TRANSACTION_TYPES),
        })
      )
      .min(1),
  }),
});

// Infer TypeScript type from schema
export type BacktestFormData = z.infer<typeof backtestSchema>;
