import { Broker } from "@/features/broker";
import { Form } from "@/features/form";

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  ipAddress: string;
  formId: number;
  form?: Form;
  brokerId: number;
  broker?: Broker;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  page?: number;
  limit?: number;
  search?: string;
  brokerId?: string;
  formId?: string;
  status?: string;
}
