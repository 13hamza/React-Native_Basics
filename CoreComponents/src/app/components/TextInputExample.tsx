import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function TextInputExample() {
  // --- 1. STATE MANAGEMENT ---
  // useState holds the value typed into each input field.
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [multiline, setMultiline] = useState("");
  const [phone, setPhone] = useState("");

  // --- 2. VALIDATION & SUBMIT HANDLERS ---

  // Basic Text Validation
  const handleSubmitBasic = () => {
    if (text.trim() === "") {
      Alert.alert("Error", "Basic input cannot be empty!");
      return;
    }
    Alert.alert("Success", `Submitted text: ${text}`);
  };

  // Password Validation: Must be at least 6 characters long
  const handleSubmitPassword = () => {
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long!");
      return;
    }
    Alert.alert("Success", "Password meets requirements and was submitted!");
  };

  // Email Validation: Must contain '@' and '.'
  const handleSubmitEmail = () => {
    // Check if email contains '@' and at least one dot '.' after it
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Error", "Please enter a valid Gmail address containing '@' and '.'");
      return;
    }
    Alert.alert("Success", `Email registered: ${email}`);
  };

  // Numeric Input Validation: Check if it's purely digits and not empty
  const handleSubmitNumber = () => {
    if (!number || isNaN(Number(number))) {
      Alert.alert("Error", "Please enter a valid number!");
      return;
    }
    Alert.alert("Success", `Number saved: ${number}`);
  };

  // Multiline Text Validation
  const handleSubmitMultiline = () => {
    if (multiline.trim().length < 10) {
      Alert.alert("Error", "Please write a bit more (at least 10 characters).");
      return;
    }
    Alert.alert("Success", "Message submitted successfully!");
  };

  // Phone Number Validation: Check length after removing dashes
  const handleSubmitPhone = () => {
    const rawDigits = phone.replace(/\D/g, ""); // strip non-digit characters
    if (rawDigits.length !== 10) {
      Alert.alert("Error", "Phone number must contain exactly 10 digits!");
      return;
    }
    Alert.alert("Success", `Formatted phone submitted: ${phone}`);
  };

  return (
    // KeyboardAvoidingView prevents the mobile keyboard from hiding input fields
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>React Native Inputs & Validation</Text>

        {/* --- SECTION 1: BASIC TEXT INPUT --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>1. Basic Input</Text>
          <TextInput
            style={styles.input}
            placeholder="Type anything..."
            value={text}
            onChangeText={setText} // Updates state as user types
          />
          <Text style={styles.valueText}>Live output: {text}</Text>
          <View style={styles.buttonWrapper}>
            <Button title="Submit Text" onPress={handleSubmitBasic} />
          </View>
        </View>

        {/* --- SECTION 2: PASSWORD INPUT --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>2. Password (min 6 characters)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={true} // Hides text with dots/asterisks
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonWrapper}>
            <Button title="Submit Password" onPress={handleSubmitPassword} color="#2196F3" />
          </View>
        </View>

        {/* --- SECTION 3: EMAIL INPUT --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>3. Email (Must include '@')</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            keyboardType="email-address" // Shows '@' key prominently on keyboard
            autoCapitalize="none" // Prevents automatic capitalization of the first letter
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.buttonWrapper}>
            <Button title="Submit Email" onPress={handleSubmitEmail} color="#4CAF50" />
          </View>
        </View>

        {/* --- SECTION 4: NUMERIC INPUT --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>4. Numbers Only (Max 10 digits)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a number"
            keyboardType="numeric" // Opens numeric keypad
            value={number}
            onChangeText={setNumber}
            maxLength={10} // Hard limit on character count
          />
          <View style={styles.buttonWrapper}>
            <Button title="Submit Number" onPress={handleSubmitNumber} color="#FF9800" />
          </View>
        </View>

        {/* --- SECTION 5: MULTILINE TEXT INPUT --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>5. Multiline Feedback / Bio</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Type multiple lines here..."
            multiline={true}
            numberOfLines={4}
            value={multiline}
            onChangeText={setMultiline}
            textAlignVertical="top" // Ensures text starts at the top-left on Android
          />
          <View style={styles.buttonWrapper}>
            <Button title="Submit Feedback" onPress={handleSubmitMultiline} color="#9C27B0" />
          </View>
        </View>

        {/* --- SECTION 6: FORMATTED PHONE NUMBER --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>6. Auto-formatting Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="123-456-7890"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(rawText) => {
              // 1. Remove all non-numeric characters
              const cleaned = rawText.replace(/\D/g, "");
              
              // 2. Format numbers as XXX-XXX-XXXX using Regex
              let formatted = cleaned;
              if (cleaned.length > 6) {
                formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
              } else if (cleaned.length > 3) {
                formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
              }
              
              // 3. Save formatted text to state
              setPhone(formatted);
            }}
            maxLength={12} // Account for 10 digits + 2 hyphens
          />
          <View style={styles.buttonWrapper}>
            <Button title="Submit Phone" onPress={handleSubmitPhone} color="#E91E63" />
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- 3. STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    // Elevation adds a subtle shadow on Android
    elevation: 2, 
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  multilineInput: {
    height: 100,
    paddingTop: 12,
  },
  valueText: {
    marginTop: 6,
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
  },
  buttonWrapper: {
    marginTop: 12,
  },
});

export default TextInputExample;