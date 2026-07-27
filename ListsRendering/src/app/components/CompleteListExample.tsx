import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

// 🔹 Define the type for a post item
type Post = {
  id: number;
  title: string;
  body: string;
};

const CompleteListExample = () => {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔹 Fetch items from API (with pagination)
  const fetchItems = async (pageNum: number, reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=20`
      );
      const newItems: Post[] = await response.json();

      if (reset) {
        setItems(newItems); // Replace all items on refresh
      } else {
        setItems(prev => [...prev, ...newItems]); // Append new items
      }

      setHasMore(newItems.length > 0); // Stop if no more items
      setPage(reset ? 2 : pageNum + 1); // Reset page to 2 if refreshing
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 🔹 Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setHasMore(true);
    setPage(1);
    fetchItems(1, true);
  };

  // 🔹 Filter items based on search term
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Render a single post item
  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => console.log('Pressed:', item.id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {item.body}
      </Text>
      <Text style={styles.id}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  // 🔹 Render the header (title + search bar)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>My Posts</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#999"
      />
    </View>
  );

  // 🔹 Render the footer (loading spinner or "all loaded" message)
  const renderFooter = () => {
    if (!loading) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {filteredItems.length > 0 ? '✓ All items loaded' : 'No items to show'}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  // 🔹 Render empty state (when no items match search)
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No posts found</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  // 🔹 Initial load
  useEffect(() => {
    fetchItems(1);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredItems} // Use filtered items
        renderItem={renderItem}
        keyExtractor={item => `post-${item.id}`} // Unique key for each item
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={() => {
          if (!loading && hasMore) fetchItems(page);
        }}
        onEndReachedThreshold={0.3}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        initialNumToRender={10}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  searchInput: {
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  id: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CompleteListExample;