import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { getItem, setItem, removeItem } from './storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 1, // 1 minute
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
