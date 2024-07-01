import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { getItem, setItem, removeItem } from './storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 1000 * 60 * 60 * 24, // TODO: enable this
      staleTime: 1000 * 60 * 1, // 1 minutes
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem,
    setItem,
    removeItem,
  },
});

persistQueryClient({
  queryClient,
  persister: asyncStoragePersister,
});

export default queryClient;
