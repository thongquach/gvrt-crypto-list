import { ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useLatestList } from '@/hooks/queryHooks';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import React from 'react';
import PriceList from '../../components/PriceList';

export default function Dashboard() {
  const { data, isLoading, error } = useLatestList();

  return (
    <ThemedSafeAreaView>
      {isLoading && <ActivityIndicator />}
      {error && <ThemedText>Error: {error.message}</ThemedText>}
      {!isLoading && data && <PriceList coins={data} />}
    </ThemedSafeAreaView>
  );
}
