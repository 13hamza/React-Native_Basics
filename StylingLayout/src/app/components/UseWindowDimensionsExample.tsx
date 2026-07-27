import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';

const UseWindowDimensionsExample = () => {
  const { width, height, scale, fontScale } = useWindowDimensions();

  // Responsive styling based on screen width
  const isLandscape = width > height;
  const isTablet = width > 768;

  return (
    <View style={styles.container}>
      <Text>Width: {width}</Text>
      <Text>Height: {height}</Text>
      <Text>Scale: {scale}</Text>
      <Text>Font Scale: {fontScale}</Text>
      <Text>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</Text>
      <Text>Device: {isTablet ? 'Tablet' : 'Phone'}</Text>

      {/* Responsive layout */}
      <View style={[
        styles.responsiveBox,
        isLandscape ? styles.landscapeBox : styles.portraitBox,
      ]}>
        <Text>{isLandscape ? '🌅' : '📱'}</Text>
        <Text>{isLandscape ? 'Landscape Mode' : 'Portrait Mode'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  responsiveBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitBox: {
    width: 200,
    height: 300,
    backgroundColor: '#4CAF50',
  },
  landscapeBox: {
    width: 300,
    height: 150,
    backgroundColor: '#FF9800',
  },
});

export default UseWindowDimensionsExample;