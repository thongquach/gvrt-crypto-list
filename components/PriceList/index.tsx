import { StyleSheet, TextInput } from 'react-native';

import { Coin } from '@/hooks/queryHooks';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { PriceItem } from './PriceItem';
import SearchInput from '../SeachInput';

export default function PriceList({ coins }: { coins: Coin[] }) {
  const [search, setSearch] = React.useState('');
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <SearchInput value={search} onChangeText={setSearch} />
      <FlashList
        data={filteredCoins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PriceItem coin={item} />}
        estimatedItemSize={100} // TODO: update this
      />
    </>
  );
}
