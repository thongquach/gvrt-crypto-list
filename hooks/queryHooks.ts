import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

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

const fetchLatestList = async () => {
  const { data } = await api.get<LatestListResponse>(
    'v1/cryptocurrency/listings/latest',
  );
  return data;
};

export const useLatestList = () => {
  return useQuery({
    queryKey: ['latestList'],
    queryFn: fetchLatestList,
    select: (response) => response.data,
  });
};
