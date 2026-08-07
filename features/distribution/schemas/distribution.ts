import { z } from "zod";

export const distributionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  formId: z.number().min(1, { message: "Form is required" }),
  brokers: z.array(
    z.object({
      brokerId: z.number(),
      percentage: z.number().min(1).max(100),
      active: z.boolean(),
    }),
  ),
});

export type DistributionFormValues = z.infer<typeof distributionSchema>;
