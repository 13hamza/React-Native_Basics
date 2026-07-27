import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Switch, 
  Platform 
} from 'react-native';

// Modern Industry Standard:
// Always use react-native-safe-area-context instead of 'react-native''s built-in SafeAreaView.
// It supports Android notches, supports targeted edges (top, bottom, left, right), 
// and provides hooks to measure safe spacing dynamically.
import { 
  SafeAreaProvider, 
  SafeAreaView, 
  useSafeAreaInsets 
} from 'react-native-safe-area-context';

// ==========================================
// EXAMPLE 1: Standard Safe Area & Status Bar
// ==========================================
function SafeAreaExample() {
  // State to track whether Dark Mode is toggled on or off
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    // SafeAreaView dynamically applies padding to prevent UI overlap with notches and home bars
    <SafeAreaView 
      style={[styles.container, isDarkMode && styles.darkContainer]}
      // Optional: You can specify which edges to protect. Defaults to all ('top', 'bottom', 'left', 'right')
      edges={['top', 'bottom', 'left', 'right']}
    >
      {/* 
        StatusBar controls the system bar at the top (battery, time, wifi).
        - barStyle: 'light-content' makes icons white; 'dark-content' makes icons dark/black.
        - translucent: Setting to false ensures content doesn't draw underneath on Android.
      */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#121212' : '#ffffff'}
        translucent={false}
      />

      {/* Main Page Layout */}
      <View style={styles.content}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          SafeAreaView & StatusBar
        </Text>

        {/* Informational Card */}
        <View style={[styles.demoBox, isDarkMode && styles.darkDemoBox]}>
          <Text style={[styles.demoText, isDarkMode && styles.darkText]}>
            This content is safely rendered inside a SafeAreaView.
          </Text>
          <Text style={[styles.demoText, isDarkMode && styles.darkSubText]}>
            It automatically pads around notches, hole-punch cameras, and bottom navigation bars.
          </Text>
        </View>

        {/* Dark Mode Toggle Switch */}
        <View style={[styles.controlPanel, isDarkMode && styles.darkControlPanel]}>
          <Text style={[styles.controlLabel, isDarkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#6200ee' : '#f4f3f4'}
          />
        </View>

        {/* Diagnostics Box */}
        <View style={[styles.infoBox, isDarkMode && styles.darkInfoBox]}>
          <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
            Operating System: {Platform.OS}
          </Text>
          <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
            Icon Color: {isDarkMode ? 'Light (White)' : 'Dark (Black)'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// EXAMPLE 2: Advanced Dynamic Inset Hook
// ==========================================
// Instead of guessing if a device has a notch (like checking for "iPhone X"),
// use the `useSafeAreaInsets` hook. It tells you the exact pixel height 
// of top notches, bottom gesture bars, etc.
function DeviceAwareExample() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.deviceAwareContent}>
        <Text style={styles.title}>Dynamic Insets Example</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Top Notch/Bar Height: {insets.top}px</Text>
          <Text style={styles.infoText}>Bottom Indicator Height: {insets.bottom}px</Text>
          <Text style={styles.infoText}>
            Has Top Notch/Cutout? {insets.top > 20 ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ==========================================
// STEP 3: Root Application Wrapper
// ==========================================
// Always wrap your root app component with <SafeAreaProvider>!
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaExample />
    </SafeAreaProvider>
  );
}

// ==========================================
// STEP 4: Component Stylesheet
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  darkText: {
    color: '#ffffff',
  },
  darkSubText: {
    color: '#cccccc',
  },
  demoBox: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
  },
  darkDemoBox: {
    backgroundColor: '#1e1e1e',
  },
  demoText: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 6,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Fixed the cut-off styling here!
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 20,
  },
  darkControlPanel: {
    backgroundColor: '#1e1e1e',
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  infoBox: {
    padding: 16,
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
  },
  darkInfoBox: {
    backgroundColor: '#2c2c2c',
  },
  infoText: {
    fontSize: 14,
    color: '#333333',
    marginVertical: 2,
  },
  deviceAwareContent: {
    flex: 1,
    padding: 20,
  },
});