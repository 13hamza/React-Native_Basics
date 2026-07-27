import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  RefreshControl, 
  SafeAreaView, 
  ActivityIndicator 
} from 'react-native';

// ==========================================
// STEP 1: Helper Function to Create Fake Data
// ==========================================
// Generates an array of objects to display in our list
const generateData = (count, startIndex = 0) => {
  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i;
    return {
      id: `${index}`, // Unique string ID required by FlatList
      title: `Item ${index + 1}`,
      description: `This is description for item ${index + 1}`,
      color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`, // Generates a distinct color
    };
  });
};

// ==========================================
// STEP 2: Main Component
// ==========================================
export default function FlatListExample() {
  // --- STATE MANAGEMENT ---
  // Stores the list items
  const [data, setData] = useState(() => generateData(50)); 
  // Tracks pull-to-refresh loading state
  const [refreshing, setRefreshing] = useState(false); 
  // Tracks infinite scroll (load more) state
  const [loading, setLoading] = useState(false); 
  // Stores the ID of the item currently tapped/selected
  const [selectedId, setSelectedId] = useState(null); 

  // --- EVENT HANDLERS ---
  
  // Triggered when user pulls down on the list
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate a network request with a 1.5-second timer
    setTimeout(() => {
      setData(generateData(50)); // Reset back to initial 50 items
      setRefreshing(false); // Hide refresh spinner
    }, 1500);
  }, []);

  // Triggered when user scrolls to the bottom of the list
  const loadMore = useCallback(() => {
    // Don't trigger if already fetching more items
    if (loading) return; 

    setLoading(true);

    // Simulate appending new items from an API
    setTimeout(() => {
      setData((prevData) => [
        ...prevData, 
        ...generateData(20, prevData.length) // Append 20 new items starting after current length
      ]);
      setLoading(false); // Hide bottom loading spinner
    }, 1500);
  }, [loading]);

  // --- RENDER FUNCTIONS FOR FLATLIST ---

  // Renders a single row in the list
  const renderItem = ({ item }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity 
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedId(isSelected ? null : item.id)} // Toggle selection
        activeOpacity={0.7}
      >
        {/* Small color square */}
        <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
        
        {/* Text Details */}
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>

        {/* Checkmark icon shown only if item is selected */}
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Header component pinned to the top of the list
  const ListHeaderComponent = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>FlatList Examples</Text>
      <Text style={styles.subHeader}>Total: {data.length} items</Text>
    </View>
  );

  // Spinner shown at the bottom while fetching more data
  const ListFooterComponent = () => {
    if (!loading) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.footerText}>Loading more...</Text>
      </View>
    );
  };

  // Shown when data array is empty
  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items to display</Text>
    </View>
  );

  // --- COMPONENT OUTPUT ---
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        // Data & Layout
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        
        // Header & Sticky Behavior
        ListHeaderComponent={ListHeaderComponent}
        stickyHeaderIndices={[0]} // Index 0 is now ListHeaderComponent
        
        // Pull-to-Refresh
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#6200ee"
            colors={["#6200ee"]}
          />
        }
        
        // Infinite Scroll
        onEndReached={loadMore}
        onEndReachedThreshold={0.5} // Triggers loadMore when 50% from the bottom
        
        // Custom UI Slots
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        
        // Performance Tuning
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

// ==========================================
// STEP 3: Styles
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 15,
    backgroundColor: '#6200ee',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subHeader: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selectedItem: {
    backgroundColor: '#e3f2fd',
    borderColor: '#6200ee',
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  itemDescription: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
  },
});