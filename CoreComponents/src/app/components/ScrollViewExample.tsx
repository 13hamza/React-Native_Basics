import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  RefreshControl, 
  SafeAreaView 
} from 'react-native';

/**
 * ============================================================================
 * COMPONENT: ScrollViewExample
 * ============================================================================
 * LOGIC OVERVIEW:
 * 1. Demonstrates standard vertical scrolling with Pull-to-Refresh functionality.
 * 2. Demonstrates horizontal scrolling for carousels or tab bar styles.
 * 3. Demonstrates rendering mixed content blocks inside a container.
 * 
 * WHY USE SCROLLVIEW?
 * Use ScrollView when you have a small, fixed amount of known content that 
 * needs to be scrollable.
 * 
 * WHEN NOT TO USE SCROLLVIEW:
 * Avoid ScrollView for long lists (e.g., 50+ items). ScrollView renders ALL its 
 * children into memory immediately on mount, which can cause performance lag. 
 * Use `FlatList` or `SectionList` instead for large datasets because they 
 * virtualize items (only rendering what is currently visible on screen).
 * ============================================================================
 */
function ScrollViewExample() {
  /*
   * --------------------------------------------------------------------------
   * STATE MANAGEMENT
   * --------------------------------------------------------------------------
   * `refreshing`: Tracks whether the pull-to-refresh spinner is currently active.
   * `items`: Holds our array of strings displayed in the vertical list.
   * Array.from({ length: 20 }, ...) generates an initial array of 20 items.
   */
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)
  );

  /*
   * --------------------------------------------------------------------------
   * PULL-TO-REFRESH LOGIC (`onRefresh`)
   * --------------------------------------------------------------------------
   * HOW IT WORKS:
   * 1. User pulls down at the top of the ScrollView.
   * 2. `RefreshControl` triggers this function.
   * 3. We set `refreshing` to true, showing the loading spinner.
   * 4. We simulate an async network request using `setTimeout`.
   * 5. Once updated data arrives, we update `items` state and set `refreshing`
   *    back to false to dismiss the spinner.
   */
  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a 2-second backend API response delay
    setTimeout(() => {
      setItems(
        Array.from({ length: 20 }, (_, i) => `Item ${i + 1} (refreshed)`)
      );
      setRefreshing(false);
    }, 2000);
  };

  return (
    /*
     * SafeAreaView ensures content remains visible and is not obstructed by
     * physical device features like top notches, camera cutouts, or bottom home bars.
     */
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>ScrollView Examples</Text>
      
      {/* 
        ======================================================================
        SECTION 1: Vertical ScrollView with Pull-to-Refresh
        ======================================================================
        WHY CONTENTCONTAINERSTYLE IS USED:
        - `style`: Controls the outer frame dimensions (e.g., height, width, border).
        - `contentContainerStyle`: Styles the INNER content layout (e.g., padding, flex alignments).
          Applying padding directly to `style` often clips scrollbar boundaries incorrectly.
      */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Vertical Scroll with Pull-To-Refresh</Text>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            /*
             * RefreshControl is a React Native prop component that handles 
             * native drag-down-to-refresh gestures across iOS and Android.
             */
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/*
            JavaScript `.map()` iterates through our array and transforms each item 
            into a renderable React Native element.
            
            WHY `key={index}` IS REQUIRED:
            React uses unique keys to keep track of list items. Without a key, 
            React cannot accurately optimize DOM re-renders when list order changes.
          */}
          {items.map((item, index) => (
            <View key={index} style={styles.scrollItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* 
        ======================================================================
        SECTION 2: Horizontal ScrollView
        ======================================================================
        HOW HORIZONTAL SCROLLING WORKS:
        - `horizontal={true}` flips the scroll axis from vertical to horizontal.
        - `showsHorizontalScrollIndicator={false}` hides the bottom scrollbar 
          for a cleaner UI presentation (common in horizontal cards/carousels).
      */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Horizontal Scroll</Text>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
          contentContainerStyle={styles.horizontalContent}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <View key={i} style={styles.horizontalItem}>
              <Text style={styles.itemText}>H-{i + 1}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      
      {/* 
        ======================================================================
        SECTION 3: Mixed Content
        ======================================================================
        WHY SCROLLVIEW EXCELS HERE:
        Unlike `FlatList` (which expects uniform data items array), `ScrollView` 
        allows you to mix completely arbitrary child components (Text, Images, Buttons, 
        Cards) together under a single scrollable view.
      */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Mixed Content Containers</Text>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.mixedItem}>
            <Text style={styles.mixedText}>
              This ScrollView contains static text elements...
            </Text>
          </View>
          <View style={styles.mixedItem}>
            <Text style={styles.mixedText}>
              All children are rendered into memory immediately at once.
            </Text>
          </View>
          <View style={styles.mixedItem}>
            <Text style={styles.mixedText}>
              Ideal for forms, detail pages, and static settings menus!
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/*
 * ============================================================================
 * STYLESHEET DEFINITIONS
 * ============================================================================
 * Using `StyleSheet.create` validates styling properties at build time 
 * and optimizes performance by passing numeric IDs across the native bridge.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the entire available screen height
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  scrollView: {
    height: 150, // Fixed height keeps the scroll container bounded
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 10,
  },
  scrollItem: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  horizontalScroll: {
    height: 80,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  horizontalContent: {
    paddingHorizontal: 10,
    alignItems: 'center', // Centers items vertically inside the horizontal track
  },
  horizontalItem: {
    width: 80,
    height: 55,
    backgroundColor: '#fff3e0',
    marginRight: 10,
    justifyContent: 'center', // Centers text vertically inside the card
    alignItems: 'center',     // Centers text horizontally inside the card
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ffcc80',
  },
  mixedItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f3e5f5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ce93d8',
  },
  mixedText: {
    fontSize: 13,
    color: '#333',
  },
});

export default ScrollViewExample;