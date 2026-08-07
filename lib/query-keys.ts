export const queryKeys = {
  brokers: {
    all: ["brokers"] as const,
    list: (filters?: unknown) => [...queryKeys.brokers.all, filters] as const,
    detail: (id: number) => [...queryKeys.brokers.all, id] as const,
  },

  leads: {
    all: ["leads"] as const,
  },

  distributions: {
    all: ["distributions"] as const,
  },
};
