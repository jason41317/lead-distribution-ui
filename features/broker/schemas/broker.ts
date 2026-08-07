import { z } from "zod";

export const brokerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  active: z.boolean(),
  dailyCap: z.number().min(0, { message: "Daily cap is re" }),
  timezone: z.string().min(1, { message: "Timezone is required" }),
  openingTime: z.string().min(1, { message: "Opening time is required" }),
  closingTime: z.string().min(1, { message: "Closing time is required" }),
  workingDays: z.array(z.number().max(7)).min(1, { message: "At least one working day is required" }),
});

export type BrokerFormValues = z.infer<typeof brokerSchema>;
