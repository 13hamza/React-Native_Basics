// 1. IMPORTS
// React and 'useState' hook to manage controlled component state.
import { useState } from "react";

// Core UI elements provided by React Native for building layouts and handling user input.
import {
    Platform, // Utility to create optimized style objects
    ScrollView, // Text display component
    StyleSheet, // Scrollable container to allow content to extend beyond screen height
    Switch, // Interactive text field component for user input
    Text, // Generic container component (similar to <div>)
    TextInput,
    View, // Generic container component (similar to <div>)
} from "react-native";

const TextInputPropsDemo = () => {
  // -------------------------------------------------------------
  // STATE MANAGEMENT (CONTROLLED INPUTS)
  // Each input uses a React state variable to store its current value.
  // When a user types, `onChangeText` updates the state, which then updates the UI.
  // -------------------------------------------------------------
  const [numericValue, setNumericValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [password, setPassword] = useState("");
  const [multilineText, setMultilineText] = useState("");

  // Boolean states to toggle properties interactively via Switch controls
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(true);
  const [isSecure, setIsSecure] = useState(true);

  return (
    // ScrollView ensures all input sections are reachable on smaller screens
    <ScrollView style={styles.container}>
      <Text style={styles.title}>TextInput Props Demo</Text>

      {/* ========================================================= */}
      {/* SECTION 1: KEYBOARD TYPES                                 */}
      {/* Demonstrates customizing the native device keyboard design*/}
      {/* ========================================================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Keyboard Types</Text>

        {/* NUMERIC KEYBOARD */}
        <Text style={styles.label}>Numeric (keyboardType="numeric")</Text>
        <TextInput
          style={styles.input}
          value={numericValue}
          onChangeText={setNumericValue}
          keyboardType="numeric" // Opens number pad layout on device
          placeholder="Enter numbers only" // Hint text visible when value is empty
          maxLength={10} // Limits user input to a maximum of 10 characters
        />

        {/* PHONE KEYBOARD */}
        <Text style={styles.label}>Phone (keyboardType="phone-pad")</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad" // Opens phone dialer layout (+, *, # keys included)
          placeholder="Enter phone number"
          maxLength={15}
        />

        {/* EMAIL KEYBOARD */}
        <Text style={styles.label}>Email (keyboardType="email-address")</Text>
        <TextInput
          style={styles.input}
          value={emailValue}
          onChangeText={setEmailValue}
          keyboardType="email-address" // Adds convenient '@' and '.com' keys on soft keyboard
          autoCapitalize="none" // Disables automatic capitalization for email addresses
          placeholder="Enter email address"
        />
      </View>

      {/* ========================================================= */}
      {/* SECTION 2: SECURITY & AUTOCORRECT                         */}
      {/* Demonstrates password masking and text correction behavior*/}
      {/* ========================================================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security & AutoCorrect</Text>

        {/* TOGGLE SECURE ENTRY */}
        <View style={styles.row}>
          <Text>Secure Text Entry</Text>
          <Switch
            value={isSecure}
            onValueChange={setIsSecure}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        {/* PASSWORD INPUT */}
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isSecure} // When true, hides typed text behind dots/bullets
          placeholder="Enter password"
          maxLength={20}
          autoCorrect={false} // Prevents native OS spell-check on passwords
        />

        {/* TOGGLE AUTOCORRECT */}
        <View style={styles.row}>
          <Text>Auto Correct</Text>
          <Switch
            value={autoCorrectEnabled}
            onValueChange={setAutoCorrectEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        {/* MULTILINE INPUT WITH AUTOCORRECT */}
        <TextInput
          style={styles.input}
          value={multilineText}
          onChangeText={setMultilineText}
          placeholder="Multiline text with auto correct"
          multiline // Allows text to wrap into multiple lines (like a <textarea>)
          numberOfLines={3} // Sets initial visible height allowance on Android
          textAlignVertical="top" // Aligns placeholder/input text to top edge instead of middle
          autoCorrect={autoCorrectEnabled} // Dynamically toggles device auto-correction behavior
        />
      </View>

      {/* ========================================================= */}
      {/* SECTION 3: RETURN KEY TYPES                               */}
      {/* Changes the label/action icon on the keyboard Enter key   */}
      {/* ========================================================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Return Key Types</Text>

        {/* SEARCH ACTION */}
        <TextInput
          style={styles.input}
          placeholder="returnKeyType='search'"
          returnKeyType="search" // Displays "Search" or a magnifying glass icon on Enter key
          onSubmitEditing={() => console.log("Search submitted")} // Fires when the Enter key is pressed
        />

        {/* NEXT FIELD ACTION */}
        <TextInput
          style={styles.input}
          placeholder="returnKeyType='next'"
          returnKeyType="next" // Displays "Next" on Enter key (useful for forms)
          onSubmitEditing={() => console.log("Next pressed")}
        />

        {/* DONE ACTION */}
        <TextInput
          style={styles.input}
          placeholder="returnKeyType='done'"
          returnKeyType="done" // Displays "Done" on Enter key
          onSubmitEditing={() => console.log("Done pressed")}
        />

        {/* GO ACTION */}
        <TextInput
          style={styles.input}
          placeholder="returnKeyType='go'"
          returnKeyType="go" // Displays "Go" on Enter key
          onSubmitEditing={() => console.log("Go pressed")}
        />
      </View>

      {/* ========================================================= */}
      {/* SECTION 4: AUTO CAPITALIZATION                            */}
      {/* Configures how shifting works as the user types           */}
      {/* ========================================================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto Capitalization</Text>

        {/* CAPITALIZE WORDS */}
        <TextInput
          style={styles.input}
          placeholder="autoCapitalize='words'"
          autoCapitalize="words" // Capitalizes first letter of every word (e.g., John Doe)
        />

        {/* CAPITALIZE SENTENCES */}
        <TextInput
          style={styles.input}
          placeholder="autoCapitalize='sentences'"
          autoCapitalize="sentences" // Capitalizes first letter after period punctuation (Default)
        />

        {/* CAPITALIZE CHARACTERS */}
        <TextInput
          style={styles.input}
          placeholder="autoCapitalize='characters'"
          autoCapitalize="characters" // Capitalizes every single letter (e.g., promo codes, state abbreviations)
        />

        {/* DISABLE CAPITALIZATION */}
        <TextInput
          style={styles.input}
          placeholder="autoCapitalize='none'"
          autoCapitalize="none" // Keeps all text strictly lowercase
        />
      </View>

      {/* ========================================================= */}
      {/* SECTION 5: ADDITIONAL USEFUL PROPS                       */}
      {/* Advanced features like autocomplete and read-only inputs */}
      {/* ========================================================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Additional Props</Text>

        {/* CLEAR BUTTON (iOS ONLY) */}
        <TextInput
          style={styles.input}
          placeholder="clearButtonMode='while-editing' (iOS only)"
          clearButtonMode="while-editing" // Shows a small "x" button on the right edge to clear text instantly
        />

        {/* AUTOFILL / AUTOCOMPLETE */}
        <TextInput
          style={styles.input}
          placeholder="textContentType='username'"
          textContentType="username" // Helps iOS Password Manager auto-fill saved usernames
          autoComplete="username" // Helps Android Autofill service identify input purpose
        />

        <TextInput
          style={styles.input}
          placeholder="textContentType='password'"
          textContentType="password" // Helps iOS identify this as a password field for password manager integration
          secureTextEntry
        />

        {/* DISABLED INPUT */}
        <TextInput
          style={[styles.input, styles.disabledInput]} // Combines standard input styles with disabled background style
          placeholder="editable={false}"
          editable={false} // Prevents user interaction or editing entirely
          value="This field is disabled"
        />
      </View>
    </ScrollView>
  );
};

// -------------------------------------------------------------
// STYLESHEET DEFINITIONS
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // Demonstrates platform-specific elevation/shadow styling
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2, // Android uses a single material elevation integer instead of shadows
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#444",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  disabledInput: {
    backgroundColor: "#f0f0f0", // Dim background to signal read-only state visually
    color: "#999",
  },
  row: {
    flexDirection: "row", // Align child label and switch side-by-side horizontally
    justifyContent: "space-between", // Push label to left and switch to right
    alignItems: "center", // Vertically align label text with switch toggle
    marginBottom: 8,
  },
});

export default TextInputPropsDemo;
