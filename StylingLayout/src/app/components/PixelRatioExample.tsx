import React from 'react';
import { View, Text, PixelRatio, StyleSheet } from 'react-native';

const PixelRatioExample = () => {
  const pixelRatio = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();
  const pixelDensity = PixelRatio.getPixelSizeForLayoutSize(1);

  // Get dimensions in pixels (not density-independent)
  const screenWidthPx = PixelRatio.getPixelSizeForLayoutSize(375);

  // Create a hairline border (1 physical pixel)
  const hairlineWidth = StyleSheet.hairlineWidth;

  // For images - multiply by pixel ratio
  const imageSize = 50 * pixelRatio; // 50dp * pixel ratio

  return (
    <View style={styles.container}>
      <Text>Pixel Ratio: {pixelRatio}</Text>
      <Text>Font Scale: {fontScale}</Text>
      <Text>1dp = {pixelDensity} physical pixels</Text>
      <Text>Hairline width: {hairlineWidth}px</Text>
      <Text>Image should be {imageSize}x{imageSize}px for sharpness</Text>

      {/* Hairline border - 1 physical pixel */}
      <View style={styles.hairlineBox}>
        <Text>Hairline border</Text>
      </View>

      {/* Images at different DPIs */}
      <View style={styles.imageContainer}>
        <View style={[styles.imageBox, { width: 50, height: 50 }]}>
          <Text>@1x</Text>
        </View>
        <View style={[styles.imageBox, { width: 75, height: 75 }]}>
          <Text>@1.5x</Text>
        </View>
        <View style={[styles.imageBox, { width: 100, height: 100 }]}>
          <Text>@2x</Text>
        </View>
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
  hairlineBox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    padding: 20,
    marginTop: 20,
    backgroundColor: '#e7d8d8',
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  imageBox: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#251616',
  },
});

export default PixelRatioExample;