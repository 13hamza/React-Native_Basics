import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

type Item = {
  id: number;
  title: string;
};

const LazyList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (pageNum: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);
    try {
      // Simulate API call with pagination
      const response = await fetch(
        `https://api.example.com/items?page=${pageNum}&limit=20`
      );
      const newItems: Item[] = await response.json();

      setItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length > 0); // Stop if no more items
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Failed to fetch items. Pull down to retry.');
      console.error('Error fetching:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchItems(1);
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.footerText}>Loading more...</Text>
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderError()}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={item => `item-${item.id}`}
        onEndReached={() => fetchItems(page)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
  },
});

export default LazyList;