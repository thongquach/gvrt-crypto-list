import { StyleSheet, ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useLatestList } from '@/hooks/queryHooks';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';

export default function HomeScreen() {
  const { data, isLoading, error } = useLatestList();

  return (
    <ThemedSafeAreaView>
      {isLoading && <ActivityIndicator />}
      {error && <ThemedText>Error: {error.message}</ThemedText>}
      {!isLoading && data ? (
        data.map((item) => <ThemedText key={item.id}>{item.name}</ThemedText>)
      ) : (
        <ThemedText>No data available</ThemedText>
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({});
