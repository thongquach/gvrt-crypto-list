import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

type LatestListResponse = {
  data: {
    id: number;
    name: string;
    symbol: string;
  }[];
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
