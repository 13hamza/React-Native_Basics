import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const DimensionsWithRotation = () => {
  // This will NOT update on rotation!
  const [window, setWindow] = useState(Dimensions.get('window'));

  useEffect(() => {
    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindow(window);
      console.log('Window changed:', window);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Width: {window.width}</Text>
      <Text>Height: {window.height}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DimensionsWithRotation;