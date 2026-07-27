// Import the core React library to create components

// Import basic layout and display components, plus styling tools from React Native
// - View: Acts like a container (similar to a <div> in web development)
// - Text: Used specifically for rendering text strings on screen
// - StyleSheet: Helps us create reusable and optimized CSS-like style objects
import { StyleSheet, Text, View } from "react-native";

/**
 * Greeting Component
 *
 * Props (Inputs passed into the component):
 * - name: A string containing the user's name (e.g., "Alex")
 * - isLoggedIn: A boolean (true or false) indicating if the user is logged in
 */
const Greeting = ({ name, isLoggedIn }) => {
  return (
    // The main outer wrapper/container for our component layout
    <View style={styles.container}>
      {/* Display text dynamically using Javascript */}
      <Text style={styles.text}>
        {/* 
                  Ternary Operator (Condition ? If True : If False):
                  - If `isLoggedIn` is true, display "welcome back, [name]"
                  - If `isLoggedIn` is false, display "Please login"
                */}
        {isLoggedIn ? `welcome back, ${name}` : "Please login"}
      </Text>
    </View>
  );
};

// Define styling rules to format how elements look on screen
const styles = StyleSheet.create({
  container: {
    padding: 20, // Adds space around the inside of the View container
  },
  text: {
    fontSize: 18, // Sets the size of the greeting text
  },
});

// Export the Greeting component so it can be imported and used in other files
export default Greeting;
