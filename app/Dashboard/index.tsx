import { ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { Coin, useLatestList, useUpdates } from '@/hooks/queryHooks';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import React, { useEffect } from 'react';
import SearchInput from '@/components/SeachInput';
import { FlashList } from '@shopify/flash-list';
import { PriceItem } from '@/components/PriceItem';
import { ThemedView } from '@/components/ThemedView';
import IntervalCountdown from '@/components/IntervalCountdown';
import { useDashboard } from '@/utils/dashboardStore';
import queryClient from '@/utils/queryClient';
import { InfiniteData } from '@tanstack/react-query';
import CurrentTime from '@/components/CurrentTime';

export default function Dashboard() {
  const { data, error, fetchNextPage, isFetching, isLoading, refetch } =
    useLatestList();
  const [{ lastFetchTime }] = useDashboard();
  const coins = data?.pages.flat();

  // live updates
  const { data: updates, refetch: refetchUpdates } = useUpdates(
    coins?.map((coin) => coin.id) || [],
  );
  const updatedCoins = coins?.map((coin) => {
    const update = updates?.find((u) => u.id === coin.id);
    if (!update) return coin;
    return new Date(coin.last_updated) > new Date(update.last_updated)
      ? coin
      : update;
  });

  // search
  const [search, setSearch] = React.useState('');
  const filteredCoins = updatedCoins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemedSafeAreaView>
      {isLoading && <ActivityIndicator />}
      {error && <ThemedText>Error: {error.message}</ThemedText>}
      {!isLoading && data && (
        <>
          <SearchInput value={search} onChangeText={setSearch} />
          <ThemedView style={styles.info}>
            <ThemedText type="secondary">{`Showing ${filteredCoins?.length} of ${coins?.length} results`}</ThemedText>
            <IntervalCountdown
              text="Updates in "
              onIntervalFinish={refetchUpdates}
            />
          </ThemedView>
          <ThemedView style={styles.info}>
            <ThemedText type="secondary">{`Last updated: ${lastFetchTime.toLocaleTimeString()}`}</ThemedText>
            <CurrentTime />
          </ThemedView>
          <FlashList
            data={filteredCoins}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PriceItem coin={item} />}
            estimatedItemSize={100}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  queryClient.setQueryData(
                    ['latestList'],
                    (data: InfiniteData<Coin>) => ({
                      pages: data.pages.slice(0, 1),
                      pageParams: data.pageParams.slice(0, 1),
                    }),
                  );
                  if (Date.now() - lastFetchTime.getTime() > 60000) {
                    refetch();
                  }
                }}
              />
            }
            onEndReached={() => {
              if (filteredCoins?.length === updatedCoins?.length) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
          />
        </>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
