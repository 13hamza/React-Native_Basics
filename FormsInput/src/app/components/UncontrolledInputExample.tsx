// 1. IMPORTING REACT AND UTILITIES
// React is required to build components.
// 'useRef' is a React Hook that lets you hold a value that persists across renders WITHOUT causing the screen to redraw.
import React, { useRef } from 'react';

// 2. IMPORTING REACT NATIVE UI COMPONENTS
// These are the building blocks for mobile apps:
// View -> Like a <div> in web, used for layout and layout containers.
// TextInput -> Where users type text.
// Button -> A basic tappable button.
// Text -> Displays text on screen.
// StyleSheet -> Used to write inline-like styles for our components.
// Alert -> Opens a native popup dialog box on iOS and Android.
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

const UncontrolledInputExample = () => {
  // -------------------------------------------------------------
  // UNDERSTANDING REFS & UNCONTROLLED INPUTS:
  // In React, an "uncontrolled component" stores its own data internally
  // (managed by the device native input element) rather than keeping it in React State.
  // We use `useRef` to hold onto that data silently behind the scenes.
  // -------------------------------------------------------------

  // Optional DOM-like refs: These can be used if you want to directly control 
  // the input elements (e.g., calling inputRef.current?.focus() to jump focus to an input).
  const inputRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);

  // Variable refs: These hold string values typed by the user.
  // Updating `.current` does NOT trigger a component re-render.
  const nameRef = useRef('');
  const emailRef2 = useRef('');

  // 3. EVENT HANDLERS (FUNCTIONS)
  
  // Runs whenever text in the Name input changes
  const handleNameChange = (text: string) => {
    // Store the updated string directly inside the ref
    nameRef.current = text;
  };

  // Runs whenever text in the Email input changes
  const handleEmailChange = (text: string) => {
    // Store the updated string directly inside the ref
    emailRef2.current = text;
  };

  // Triggered when the "Submit" button is pressed
  const handleSubmit = () => {
    // Print current values directly to the developer console
    console.log('Name:', nameRef.current);
    console.log('Email:', emailRef2.current);
  };

  // Triggered when the "Get Values" button is pressed
  const handleGetValues = () => {
    // Display a native popup alert with the current text stored in our refs
    Alert.alert(
      'Form Values',
      `Name: ${nameRef.current}\nEmail: ${emailRef2.current}`
    );
  };

  // 4. COMPONENT UI LAYOUT (JSX)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Uncontrolled Inputs</Text>
      
      {/* NAME INPUT FIELD */}
      <TextInput
        ref={inputRef}                     // Connects direct element reference (optional)
        style={styles.input}               // Applies border and spacing styles
        placeholder="Name"                 // Grey hint text when empty
        defaultValue="John"                // Initial text inside field (does NOT tie to React State)
        onChangeText={handleNameChange}    // Calls function whenever user types or deletes text
      />
      
      {/* EMAIL INPUT FIELD */}
      <TextInput
        ref={emailRef}                     // Connects direct element reference (optional)
        style={styles.input}
        placeholder="Email"
        defaultValue="john@example.com"
        keyboardType="email-address"        // Configures the native mobile keyboard to show '@' and '.com' easily
        onChangeText={handleEmailChange}   // Updates emailRef2 silently
      />
      
      {/* BUTTON CONTAINER */}
      <View style={styles.buttonRow}>
        <Button title="Get Values" onPress={handleGetValues} />
        <Button title="Submit" onPress={handleSubmit} color="green" />
      </View>
      
      {/* FOOTER NOTE */}
      <Text style={styles.note}>
        Note: Uncontrolled components are less common in React Native
        as we typically want React to manage the form state.
      </Text>
    </View>
  );
};

// 5. STYLES (SIMILAR TO CSS FOR MOBILE)
const styles = StyleSheet.create({
  container: { 
    flex: 1,                       // Take up the full screen height
    padding: 20                    // Add spacing inside around edges
  },
  label: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 20               // Space below title
  },
  input: {
    borderWidth: 1,                // Outline thickness
    borderColor: '#ccc',           // Light grey border color
    borderRadius: 8,               // Curved border corners
    padding: 12,                   // Inner spacing around typed text
    fontSize: 16, 
    marginBottom: 12,              // Vertical gap between inputs
  },
  buttonRow: {
    flexDirection: 'row',          // Align child buttons horizontally in a row
    justifyContent: 'space-around', // Distribute extra horizontal space evenly
    marginTop: 10,
  },
  note: {
    marginTop: 30,
    color: '#666',                 // Dimmer text color for secondary note
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default UncontrolledInputExample;