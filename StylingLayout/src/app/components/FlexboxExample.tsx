import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FlexboxExample(){
  return (
    <View style={styles.container}>
      {/* Main axis: vertical (column) */}
      <View style={styles.box}>
        <Text style={styles.text}>Box 1</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Box 2</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Box 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // DEFAULT - stacks vertically
    // flexDirection: 'row', // Change to horizontal
    justifyContent: 'center', // Main axis: center vertically (with column)
    alignItems: 'center', // Cross axis: center horizontally
    backgroundColor: '#f76c6c',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default FlexboxExample;