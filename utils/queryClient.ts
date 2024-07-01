import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { getItem, setItem, removeItem } from './storage';

export const STALE_TIME = 1000 * 60; // 60s

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: STALE_TIME,
    },
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem,
    setItem,
    removeItem,
  },
});

export default queryClient;
