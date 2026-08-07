import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z.email({
    message: "Invalid email address.",
  }),
  phone: z.string().min(1, {
    message: "Please input a valid Phone Number",
  })
});

export type LeadFormValues = z.infer<typeof LeadSchema>;
