import { ActivityIndicator, RefreshControl } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useLatestList } from '@/hooks/queryHooks';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import React from 'react';
import SearchInput from '@/components/SeachInput';
import { FlashList } from '@shopify/flash-list';
import { PriceItem } from '@/components/PriceItem';

export default function Dashboard() {
  const { data, error, fetchNextPage, isFetching, isLoading, refetch } =
    useLatestList();
  console.log({ isLoading, isFetching });

  // search
  const [search, setSearch] = React.useState('');
  const coins = data?.pages.flat();
  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ThemedSafeAreaView>
      {isLoading && <ActivityIndicator />}
      {error && <ThemedText>Error: {error.message}</ThemedText>}
      {!isLoading && data && (
        <>
          <SearchInput value={search} onChangeText={setSearch} />
          <ThemedText>{coins?.length}</ThemedText>
          <FlashList
            data={filteredCoins}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PriceItem coin={item} />}
            estimatedItemSize={100}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
          />
        </>
      )}
    </ThemedSafeAreaView>
  );
}
