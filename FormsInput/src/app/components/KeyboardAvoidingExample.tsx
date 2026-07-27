// 1. IMPORTS
// React Hooks:
// - useState: Manages form input state.
// - useRef: Holds references to TextInput components so we can programmatically trigger focus (cursor jump).
import { useRef, useState } from "react";

// Core React Native Components:
import {
    Alert, // Text renderer
    Button, // Wraps views to catch taps without adding visual press effects
    Keyboard, // Style creator
    KeyboardAvoidingView, // Wrapper that automatically adjusts layout when soft keyboard appears
    Platform, // Detects operating system (iOS or Android)
    ScrollView, // Basic button component
    StyleSheet, // Text input field
    Text, // Basic layout container
    TextInput, // Enables scrolling for forms that might exceed screen height
    TouchableWithoutFeedback,
    View, // Basic layout container
} from "react-native";

const KeyboardAvoidingExample = () => {
  // -------------------------------------------------------------
  // STATE MANAGEMENT
  // Consolidates all three form input values into a single state object.
  // -------------------------------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // -------------------------------------------------------------
  // REFS FOR KEYBOARD NAVIGATION ("NEXT" KEY FOCUS)
  // These store direct references to specific TextInput components in the DOM tree,
  // allowing us to move focus from one field to the next when tapping "Next" on the keyboard.
  // -------------------------------------------------------------
  const emailInputRef = useRef<TextInput | null>(null);
  const messageInputRef = useRef<TextInput | null>(null);

  // Helper function to update a single property inside our formData state object
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Called when submitting the form
  const handleSubmit = () => {
    // Manually hide the keyboard if it is currently visible on screen
    Keyboard.dismiss();

    // Display form data in a native alert pop-up
    Alert.alert("Form Submitted", JSON.stringify(formData, null, 2));
  };

  return (
    // STEP 1: DISMISS KEYBOARD ON OUTSIDE TAP
    // Wrapping everything in TouchableWithoutFeedback allows users to tap anywhere on the
    // blank screen area outside inputs to close the active keyboard.
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* STEP 2: PREVENT KEYBOARD FROM OVERLAPPING INPUTS */}
      {/* KeyboardAvoidingView pushes the screen content up when the soft keyboard appears. */}
      <KeyboardAvoidingView
        style={styles.container}
        // iOS requires 'padding' adjustment, while Android generally works best with 'height' or 'position'
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // Offsets the shift calculation to account for navigation bars or headers (64px on iOS)
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        enabled
      >
        {/* STEP 3: ENABLE SCROLLING */}
        {/* ScrollView ensures that if the keyboard pushes content higher than screen height, 
            the user can still scroll up and down. */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          // 'handled' allows buttons inside the scroll view to be tapped directly
          // without requiring the user to tap once to dismiss the keyboard first.
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Contact Form</Text>

          <View style={styles.formCard}>
            {/* FULL NAME INPUT */}
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Enter your full name"
              returnKeyType="next" // Displays "Next" arrow/button on soft keyboard
              onSubmitEditing={() => emailInputRef.current?.focus()} // Jumps focus to Email input on "Next" press
              blurOnSubmit={false} // Keeps keyboard visible while changing input focus
            />

            {/* EMAIL ADDRESS INPUT */}
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              ref={emailInputRef} // Connects this field to the email ref
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="Enter your email"
              keyboardType="email-address" // Displays email-optimized keyboard layout
              autoCapitalize="none" // Prevents auto-capitalizing email text
              returnKeyType="next" // Displays "Next" on soft keyboard
              onSubmitEditing={() => messageInputRef.current?.focus()} // Jumps focus to Message input
              blurOnSubmit={false} // Prevents keyboard from hiding during focus swap
            />

            {/* MULTILINE MESSAGE INPUT */}
            <Text style={styles.label}>Message *</Text>
            <TextInput
              ref={messageInputRef} // Connects this field to the message ref
              style={[styles.input, styles.textArea]}
              value={formData.message}
              onChangeText={(text) => handleChange("message", text)}
              placeholder="Enter your message"
              multiline // Converts text input into a multi-line box
              numberOfLines={4} // Initial visible height guideline (Android)
              textAlignVertical="top" // Keeps placeholder/text pinned to top edge
              returnKeyType="done" // Displays "Done" on soft keyboard
              onSubmitEditing={handleSubmit} // Triggers submission when user presses Return/Done
            />

            {/* SUBMIT BUTTON */}
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>

          {/* FOOTER - Shows dynamic current platform details */}
          <Text style={styles.footer}>
            Platform: {Platform.OS} • Behavior:{" "}
            {Platform.OS === "ios" ? "padding" : "height"}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// -------------------------------------------------------------
// STYLESHEET
// -------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    flexGrow: 1, // Allows ScrollView content to expand dynamically within space
    padding: 16,
    justifyContent: "center", // Centers form vertically if screen space allows
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#2c3e50",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    // Applies platform-specific card elevation/shadows
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100, // Height allocation for multiline field
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 8,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#6c757d",
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default KeyboardAvoidingExample;
