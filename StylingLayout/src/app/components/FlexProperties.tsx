import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexProperties = () => {
  return (
    <View style={styles.container}>
      {/* flex: 1 - Takes all available space */}
      <View style={styles.flexOne}>
        <Text>flex: 1</Text>
      </View>

      {/* flex: 2 - Takes twice as much space as flex: 1 */}
      <View style={styles.flexTwo}>
        <Text>flex: 2</Text>
      </View>

      {/* alignSelf overrides parent's alignItems */}
      <View style={styles.alignSelfExample}>
        <View style={styles.alignSelfStart}>
            <Text>Start</Text>
            </View>
        <View style={styles.alignSelfCenter}>
            <Text>Center</Text>
            </View>
        <View style={styles.alignSelfEnd}>
            <Text>End</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flexOne: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexTwo: {
    flex: 2,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignSelfExample: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#cf7070',
    alignItems: 'center', // Parent alignment
    marginTop: 10,
  },
  alignSelfStart: {
    alignSelf: 'flex-start', // Overrides parent
    backgroundColor: 'orange',
    padding: 10,
  },
  alignSelfCenter: {
    alignSelf: 'center', // Overrides parent
    backgroundColor: 'pink',
    padding: 10,
  },
  alignSelfEnd: {
    alignSelf: 'flex-end', // Overrides parent
    backgroundColor: 'teal',
    padding: 10,
  },
});
export default FlexProperties;