import { Form } from "@/features/form";

interface Broker {
  brokerId: number;
  percentage: number;
  active: boolean;
}

export interface Distribution {
  id: number;
  name: string;
  formId: number;
  form: Form;
  createdAt: string;
  updatedAt: string;
  brokers: Broker[];
}
