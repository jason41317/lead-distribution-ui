export const queryKeys = {
  brokers: {
    all: ["brokers"] as const,
    list: (filters?: unknown) => [...queryKeys.brokers.all, filters] as const,
    detail: (id: number) => [...queryKeys.brokers.all, id] as const,
  },

  forms: {
    all: ["forms"] as const,
    list: () => [...queryKeys.forms.all] as const,
    detail: (id: number) => [...queryKeys.forms.all, id] as const,
  },

  leads: {
    all: ["leads"] as const,
    list: (filters?: unknown) => [...queryKeys.leads.all, filters] as const,
    detail: (id: number) => [...queryKeys.leads.all, id] as const,
  },

  distributions: {
    all: ["distributions"] as const,
    list: () => [...queryKeys.distributions.all] as const,
    detail: (id: number) => [...queryKeys.distributions.all, id] as const,
  },
};
