import { Coin } from '@/hooks/queryHooks';

import { StyleSheet } from 'react-native';
import { formatCurrency, formatNumber } from '@/utils/format';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

export function PriceItem({ coin }: { coin: Coin }) {
  const {
    name,
    symbol,
    quote: {
      USD: { percent_change_24h, price },
    },
  } = coin;

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <ThemedText fontWeight="semiBold">{symbol}</ThemedText>
        <ThemedText type="secondary" color="secondary">
          {name}
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText
          style={styles.price}
          color={percent_change_24h >= 0 ? 'success' : 'danger'}
        >
          {`${formatNumber(percent_change_24h)}%`}
        </ThemedText>
        <ThemedText type="secondary" style={styles.percentChange}>
          {formatCurrency(price, 'USD')}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  price: {
    textAlign: 'right',
  },
  percentChange: {
    textAlign: 'right',
  },
});
