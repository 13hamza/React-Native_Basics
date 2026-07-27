import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
function AxisExample() {
    return (
         <View style={styles.container}>
      {/* flexDirection: 'column' (default) */}
      {/* Main axis = vertical, Cross axis = horizontal */}
      <View style={styles.columnLayout}>
        <View style={styles.item} />
        <View style={styles.item} />
      </View>

      {/* flexDirection: 'row' */}
      {/* Main axis = horizontal, Cross axis = vertical */}
      <View style={styles.rowLayout}>
        <View style={styles.item} />
        <View style={styles.item} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  columnLayout: {
    flexDirection: 'column',
    justifyContent: 'space-evenly', // Main axis (vertical)
    alignItems: 'center', // Cross axis (horizontal)
    height: 200,
    backgroundColor: '#532020',
    marginBottom: 20,
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Main axis (horizontal)
    alignItems: 'center', // Cross axis (vertical)
    height: 200,
    backgroundColor: '#1f0808',
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: 'purple',
  },
});
                
export default AxisExample;