import api from '@/utils/api';
import { DashboardStoreRegistry } from '@/utils/dashboardStore';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// TODO: conver to camelCase
type Quote = {
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  last_updated: string;
};

export type Coin = {
  id: number;
  name: string;
  symbol: string;
  last_updated: string;
  quote: { USD: Quote; BTC: Quote };
};

type LatestListResponse = {
  data: Coin[];
};

const LIMIT = 50;
const fetchLatestList = async (page = 0) => {
  console.log('fetchLatestList: page', page);
  DashboardStoreRegistry.actions.updateLastFetchTime();
  const { data } = await api.get<LatestListResponse>(
    `v1/cryptocurrency/listings/latest?start=${page * LIMIT + 1}&limit=${LIMIT}`,
  );
  return data.data;
};

export const useLatestList = () => {
  return useInfiniteQuery({
    queryKey: ['latestList'],
    queryFn: ({ pageParam }) => fetchLatestList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_firstPage, _allPages, lastPageParam) =>
      lastPageParam + 1,
  });
};

type UpdatesResponse = {
  data: Record<string, Coin>;
};

const fetchUpdates = async (ids: number[]) => {
  const { data } = await api.get<UpdatesResponse>(
    `/v2/cryptocurrency/quotes/latest?id=${ids.join(',')}`,
  );
  return Object.values(data.data);
};

export const useUpdates = (ids: number[]) => {
  return useQuery({
    queryKey: ['updates', ids],
    queryFn: () => fetchUpdates(ids),
    staleTime: 0,
    enabled: false,
  });
};
