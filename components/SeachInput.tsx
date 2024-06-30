import React from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) => {
  const handleClearInput = () => {
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
      />
      {value !== '' && (
        <TouchableOpacity onPress={handleClearInput}>
          <Ionicons name="close-circle-outline" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    margin: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
});

export default SearchInput;
