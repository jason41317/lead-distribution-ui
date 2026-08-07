import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required"})
});

export type FormFormValues = z.infer<typeof formSchema>;
