export interface Broker {
  id: number;
  name: string;
  active: boolean;
  dailyCap: number;
  timezone: string;
  openingTime: string;
  closingTime: string;
  workingDays: string[] | number[];
  createdAt: string;
  updatedAt: string;
}

export interface BrokerFilters {
  page?: number;
  limit?: number;
  search?: string;
}
