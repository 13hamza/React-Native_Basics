import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Alert } from 'react-native';

function ButtonExample() {
  const [pressCount, setPressCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Button Component</Text>
      
      {/* 1. Basic Button */}
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>1. Basic Button</Text>
        <Button 
          title="Press me"
          onPress={() => Alert.alert('Button Pressed!')}
        />
      </View>
      
      {/* 2. Button with color (platform-specific) */}
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>2. Colored Button</Text>
        <Button 
          title="Colored Button"
          color="#6200ee"
          onPress={() => Alert.alert('Colored button pressed!')}
        />
      </View>
      
      {/* 3. Disabled Button */}
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>3. Disabled Button</Text>
        <Button 
          title="Disabled"
          disabled={true}
          onPress={() => console.log('Won\'t fire')}
        />
      </View>
      
      {/* 4. Button with state tracking */}
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>4. Press Counter</Text>
        <Text style={styles.countText}>Pressed {pressCount} times</Text>
        <Button 
          title="Increment"
          onPress={() => setPressCount(pressCount + 1)}
        />
        <Button 
          title="Reset"
          color="#ff6b6b"
          onPress={() => setPressCount(0)}
        />
      </View>
      
      {/* 5. Toggle disable state */}
      <View style={styles.buttonContainer}>
        <Text style={styles.label}>5. To Disabled Button</Text>
        <Button 
          title={isDisabled ? "Enable Button" : "Disable Button"}
          color="#ff6b6b"
          onPress={() => setIsDisabled(!isDisabled)}
        />
        <View style={styles.spacer} />
        <Button 
          title="This button toggles"
          disabled={isDisabled}
          onPress={() => Alert.alert('Button is enabled!')}
        />
        </View>
      
      
      {/* ❌ Limitations - Can't style beyond color and disabled */}
      {/* Can't change font size, padding, border radius, etc. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },
  countText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  spacer: {
    height: 10,
  },
});
export default ButtonExample;