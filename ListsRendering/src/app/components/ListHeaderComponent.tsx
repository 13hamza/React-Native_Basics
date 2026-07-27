import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Button,
  StyleSheet,
} from 'react-native';

// 🔹 Define the shape of an item in the list
type Item = {
  id: string | number; // Unique identifier for each item
  title: string; // Display text for the item
};

const AdvancedList = () => {
  // 🔹 State for the search input text
  const [searchTerm, setSearchTerm] = useState('');

  // 🔹 Sample data for the list (replace with your actual data)
  const [allItems] = useState<Item[]>([
    { id: 1, title: 'Apple' },
    { id: 2, title: 'Banana' },
    { id: 3, title: 'Cherry' },
    { id: 4, title: 'Date' },
    { id: 5, title: 'Elderberry' },
  ]);

  // 🔹 Filter items based on the search term
  // If searchTerm is empty, show all items. Otherwise, show only matching items.
  const filteredItems = allItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Function to handle refresh (placeholder for actual refresh logic)
  const handleRefresh = () => {
    // In a real app, you might refetch data from an API here
    console.log('Refreshing data...');
  };

  // 🔹 Render a single item in the list
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  // 🔹 Header component (search bar + item count)
  const renderHeader = () => (
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        value={searchTerm}
        onChangeText={setSearchTerm} // Update search term as user types
      />
      <Text style={styles.itemCount}>Total items: {filteredItems.length}</Text>
    </View>
  );

  // 🔹 Footer component (shown at the end of the list)
  const renderFooter = () => (
    <View style={styles.footer}>
      <ActivityIndicator size="small" color="blue" />
      <Text style={styles.footerText}>End of list</Text>
    </View>
  );

  // 🔹 Empty state (shown when no items match the search)
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items found</Text>
      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );

  return (
    <FlatList
      data={filteredItems} // Use filtered items for the list
      renderItem={renderItem} // Render each item
      keyExtractor={item => String(item.id)} // Convert ID to string for the key
      ListHeaderComponent={renderHeader} // Search bar at the top
      ListFooterComponent={renderFooter} // "End of list" at the bottom
      ListEmptyComponent={renderEmptyState} // Show when no items match
    />
  );
};

// 🔹 Styles for the component (for better readability and consistency)
const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemCount: {
    marginTop: 8,
    color: 'gray',
    fontSize: 14,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    color: 'gray',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 16,
  },
});

export default AdvancedList;