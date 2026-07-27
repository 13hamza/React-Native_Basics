// 1. IMPORTS
// React and React Hooks:
// - useState: Controls active focus state, list of comments, and new comment text input.
// - useRef: Used to keep a direct reference to the TextInput component.
import { useRef, useState } from "react";

// Core React Native UI Components & Utilities:
import {
    Keyboard, // Creates optimized stylesheet objects
    KeyboardAvoidingView, // Adjusts position dynamically so soft keyboard doesn't cover input controls
    Platform, // Provides methods to dismiss/close software keyboard programmatically
    SafeAreaView, // Checks device platform ('ios' or 'android')
    ScrollView, // Keeps layout inside the device physical bounds (notches, home indicators)
    StatusBar, // Native button component (imported here, though custom TouchableOpacity is used below)
    StyleSheet, // Input component for entering multi-line comments
    Text, // Basic layout container (like a <div>)
    TextInput, // Controls style/color of device top status bar (time, battery, Wi-Fi)
    TouchableOpacity, // Allows scrolling through dynamic list items
    TouchableWithoutFeedback,
    View,
} from "react-native";

const AdvancedKeyboardAvoiding = () => {
  // -------------------------------------------------------------
  // COMPONENT STATE
  // -------------------------------------------------------------

  // Tracks which input field is focused (used to trigger active border highlight styling)
  const [activeField, setActiveField] = useState<string | null>(null);

  // Stores array of comment objects in state so new items render dynamically
  const [comments, setComments] = useState([
    { id: 1, text: "Great post!", author: "Alice" },
    { id: 2, text: "Thanks for sharing!", author: "Bob" },
  ]);

  // Stores current typed string in comment input field
  const [newComment, setNewComment] = useState("");

  // Holds direct reference to the TextInput element
  const inputRef = useRef(null);

  // -------------------------------------------------------------
  // HELPER FUNCTIONS
  // -------------------------------------------------------------

  // Adds a comment to state and closes keyboard
  const addComment = () => {
    // .trim() prevents adding empty strings or whitespace-only comments
    if (newComment.trim()) {
      // Append new comment object to existing array using spread operator (...)
      setComments((prev) => [
        ...prev,
        { id: Date.now(), text: newComment, author: "You" },
      ]);

      // Reset text field back to empty string
      setNewComment("");

      // Programmatically hide the software keyboard
      Keyboard.dismiss();
    }
  };

  return (
    // SafeAreaView avoids overlapping phone notches, camera cutouts, and bottom home bars
    <SafeAreaView style={styles.safeArea}>
      {/* Controls mobile top status bar icons color */}
      <StatusBar barStyle="dark-content" />

      {/* TOP HEADER SECTION */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comment Section</Text>
        <Text style={styles.headerSubtitle}>{comments.length} comments</Text>
      </View>

      {/* KEYBOARD HANDLING WRAPPER */}
      {/* Lifts the bottom comment bar upward when the soft keyboard pops up */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS pads from bottom, Android adjusts view height
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Offsets layout by top header height on iOS
      >
        {/* Tapping anywhere on screen outside inputs closes the soft keyboard */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            {/* SCROLLABLE COMMENTS LIST */}
            <ScrollView
              style={styles.commentsScrollView}
              contentContainerStyle={styles.commentsContainer}
            >
              {/* Map through array and render each comment dynamically */}
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </ScrollView>

            {/* BOTTOM FIXED INPUT BAR */}
            <View style={styles.inputContainer}>
              {/* TEXT INPUT FIELD */}
              <TextInput
                ref={inputRef}
                // Applies active border style dynamically when input gains focus
                style={[
                  styles.input,
                  activeField === "comment" && styles.inputActive,
                ]}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Write a comment..."
                placeholderTextColor="#999"
                multiline // Enables box to expand into multiple lines
                maxLength={200} // Restricts maximum total characters
                onFocus={() => setActiveField("comment")} // Sets active state when tapped
                onBlur={() => setActiveField(null)} // Resets active state when focus leaves
                returnKeyType="send" // Displays "Send" button on mobile soft keyboard
                onSubmitEditing={addComment} // Submits form when tapping "Send" key on keyboard
              />

              {/* CUSTOM TOUCHABLE SEND BUTTON */}
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  // Visually dims button when input is empty
                  !newComment.trim() && styles.sendButtonDisabled,
                ]}
                onPress={addComment}
                disabled={!newComment.trim()} // Disables touch handler when input is empty
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// -------------------------------------------------------------
// STYLES
// -------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  keyboardAvoidingView: {
    flex: 1, // Expands to fill available space below header
  },
  contentContainer: {
    flex: 1, // Container holding scrollview and bottom bar
  },
  commentsScrollView: {
    flex: 1, // ScrollView expands to take up remaining vertical space
  },
  commentsContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  commentItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    // Platform-specific shadow formatting
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1, // Native material elevation on Android
      },
    }),
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  commentAuthor: {
    fontWeight: "600",
    color: "#2c3e50",
    fontSize: 14,
  },
  commentText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row", // Places TextInput and Send button side-by-side
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "flex-end", // Keeps Send button aligned with bottom as input expands vertically
    ...Platform.select({
      ios: {
        paddingBottom: 16, // Gives extra breathing room above bottom swipe bar on iOS
      },
    }),
  },
  input: {
    flex: 1, // Takes up remaining horizontal space next to Send button
    minHeight: 40, // Initial input height
    maxHeight: 100, // Prevents multiline input from growing uncontrollably
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 10 : 8,
    paddingBottom: Platform.OS === "ios" ? 10 : 8,
    fontSize: 15,
    backgroundColor: "#f8f9fa",
    marginRight: 12,
  },
  inputActive: {
    borderColor: "#007AFF", // Highlight border color on active focus
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 40,
    justifyContent: "center", // Centers "Send" text vertically inside button
    alignItems: "center", // Centers "Send" text horizontally inside button
  },
  sendButtonDisabled: {
    backgroundColor: "#b0c4de", // Faded background style when disabled
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default AdvancedKeyboardAvoiding;
