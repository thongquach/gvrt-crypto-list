import api from '@/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

type TradingInfo = {
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
};

export type Coin = {
  id: number;
  name: string;
  symbol: string;
  quote: { USD: TradingInfo; BTC: TradingInfo };
};

type LatestListResponse = {
  data: Coin[];
};

const LIMIT = 20;

const fetchLatestList = async (page = 0) => {
  console.log({ page });
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
