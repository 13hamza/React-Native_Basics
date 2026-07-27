import React from 'react';
import { View, Text, useWindowDimensions, PixelRatio, StyleSheet } from 'react-native';

// Utility function for responsive sizing
const getResponsiveSize = (size, { width, height }) => {
  // Base on smallest dimension
  const baseWidth = 375; // iPhone 8 size
  const scale = Math.min(width, height) / baseWidth;
  return size * scale;
};

// Utility for pixel-perfect images
const getImageSize = (dpSize) => {
  const pixelRatio = PixelRatio.get();
  return dpSize * pixelRatio;
};

const ResponsiveUtilsExample = () => {
  const dimensions = useWindowDimensions();
  const { width, height } = dimensions;

  const responsivePadding = getResponsiveSize(20, dimensions);
  const responsiveFontSize = getResponsiveSize(16, dimensions);

  // Image optimization
  const imageDpSize = 100;
  const imagePixelSize = getImageSize(imageDpSize);

  return (
    <View style={[styles.container, { padding: responsivePadding }]}>
      <Text style={[styles.text, { fontSize: responsiveFontSize }]}>
        Responsive Text
      </Text>

      <View style={[
        styles.responsiveBox,
        {
          width: width * 0.8,
          height: height * 0.3,
        }
      ]}>
        <Text>Box fills 80% width, 30% height</Text>
        <Text>Image should be {imagePixelSize}px</Text>
      </View>

      {/* Breakpoints */}
      <View style={styles.breakpointExample}>
        {width < 600 ? (
          <View style={styles.phoneLayout}>
            <Text>📱 Phone Layout</Text>
          </View>
        ) : (
          <View style={styles.tabletLayout}>
            <Text>📟 Tablet/Desktop Layout</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    color: '#333',
    textAlign: 'center',
  },
  responsiveBox: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  breakpointExample: {
    marginTop: 20,
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  phoneLayout: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 10,
  },
  tabletLayout: {
    backgroundColor: '#FF9800',
    padding: 20,
    borderRadius: 10,
  },
});

export default ResponsiveUtilsExample;