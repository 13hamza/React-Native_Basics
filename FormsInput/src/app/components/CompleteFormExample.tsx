import { useRef, useState } from "react";
import {
    ActivityIndicator, // Loading spinner component shown while submitting
    Alert, // Displays native popup alert dialogs (iOS/Android)
    Button, // Basic native button component
    Keyboard, // Utility to manually dismiss or control the software keyboard
    KeyboardAvoidingView, // Automatically adjusts view position so the keyboard doesn't cover inputs
    Platform, // Detects operating system (iOS vs. Android)
    ScrollView, // Creates a scrollable view container
    StyleSheet, // Creates optimized CSS-like style objects
    Switch, // Native toggle switch component (used here for Terms checkbox)
    Text, // Standard component for displaying text strings
    TextInput, // Input box component where users type text
    TouchableWithoutFeedback, // Detects taps without showing any visual touch feedback/ripple
    View, // Basic block layout container (similar to <div> in HTML)
} from "react-native";

// TypeScript interface defining the exact shape and data types of our form fields
type FormData = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  password: string;
  confirmPassword: string;
  bio: string;
};

const CompleteFormExample = () => {
  // -------------------------------------------------------------
  // FORM STATE MANAGEMENT
  // -------------------------------------------------------------

  // Single state object holding all user input field values
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });

  // Stores validation error messages mapped by field name (e.g., { email: "Email is required" })
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Tracks loading state when the form submit button is pressed
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controls the state of the Terms & Conditions toggle switch
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // -------------------------------------------------------------
  // REFS FOR FIELD FOCUS NAVIGATION
  // -------------------------------------------------------------

  // Holds React references to input nodes so we can move focus programmatically
  // (e.g., when tapping "Next" on the keyboard or focusing on the first field with an error)
  const refs: Record<string, any> = {
    email: useRef(null),
    phone: useRef(null),
    age: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    bio: useRef(null),
  };

  // Helper function to update state when a user types into any field
  const handleChange = (field: keyof FormData, value: string) => {
    // Spread previous state and update only the modified field key dynamically
    setFormData((prev) => ({ ...prev, [field]: value }));

    // If an error message already exists for this field, clear it as the user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // -------------------------------------------------------------
  // FORM VALIDATION LOGIC
  // -------------------------------------------------------------

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Validate Full Name: Required & at least 2 characters
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    // Validate Email: Required & standard email format matching regex pattern
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Validate Phone: Optional field, but if filled out, must match phone number regex
    if (formData.phone && !/^[\d\s\-()+]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Validate Age: Optional field, but if filled out, must be a number between 1 and 120
    if (
      formData.age &&
      (isNaN(Number(formData.age)) ||
        parseInt(formData.age) < 1 ||
        parseInt(formData.age) > 120)
    ) {
      newErrors.age = "Please enter a valid age (1-120)";
    }

    // Validate Password: Minimum 8 chars, 1 uppercase, 1 lowercase, 1 digit
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // Validate Confirm Password: Must strictly equal primary password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate Terms Switch: Must be toggled on
    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms";
    }

    // Save identified errors into state
    setErrors(newErrors);

    // Return true if zero errors exist, signaling valid form submission
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------------------------------------------
  // SUBMISSION HANDLER
  // -------------------------------------------------------------

  const handleSubmit = async () => {
    // Run validation checks first
    if (!validate()) {
      // Find the first field name that produced an error
      const firstErrorField = Object.keys(errors)[0];

      // Auto-focus the input corresponding to the first error field if ref exists
      if (firstErrorField && refs[firstErrorField]?.current) {
        refs[firstErrorField].current.focus();
      }
      return; // Stop submission execution if validation fails
    }

    // Turn on loading state
    setIsSubmitting(true);

    // Simulate an async backend API call using Promise and setTimeout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Display native alert dialog on success
      Alert.alert("Success!", "Your profile has been created successfully.", [
        {
          text: "OK",
          onPress: () => {
            // Reset all form inputs back to clean default values
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              age: "",
              password: "",
              confirmPassword: "",
              bio: "",
            });
            setAgreeToTerms(false);
            setErrors({});
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      // Turn off loading state regardless of outcome
      setIsSubmitting(false);
    }
  };

  return (
    // Dismisses keyboard whenever tapping anywhere on empty screen space
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Shifts form content upward automatically when soft keyboard opens */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS uses padding, Android adjusts height
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Accounts for header offsets on iOS
      >
        {/* ScrollView allows vertical scrolling when input fields exceed screen height */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled" // Allows tapping buttons while keyboard is active
        >
          <View style={styles.form}>
            <Text style={styles.title}>Create Profile</Text>

            {/* FULL NAME FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]} // Conditional red border style on error
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
                placeholder="Enter your full name"
                returnKeyType="next" // Shows "Next" arrow button on software keyboard
                onSubmitEditing={() => refs.email.current?.focus()} // Tapping Next focuses Email input
                blurOnSubmit={false} // Prevents keyboard from closing when hitting Next
                autoCapitalize="words" // Auto-capitalizes first letter of each word
              />
              {/* Display error message text dynamically if error exists */}
              {errors.fullName && (
                <Text style={styles.error}>{errors.fullName}</Text>
              )}
            </View>

            {/* EMAIL FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                ref={refs.email} // Binds element reference for focus targeting
                style={[styles.input, errors.email && styles.inputError]}
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                placeholder="Enter your email"
                keyboardType="email-address" // Configures custom mobile keyboard layout for email inputs
                autoCapitalize="none" // Disables auto-capitalization for email addresses
                returnKeyType="next"
                onSubmitEditing={() => refs.phone.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </View>

            {/* PHONE FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                ref={refs.phone}
                style={[styles.input, errors.phone && styles.inputError]}
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
                placeholder="Enter phone number"
                keyboardType="phone-pad" // Configures number keypad layout
                returnKeyType="next"
                onSubmitEditing={() => refs.age.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            </View>

            {/* AGE FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                ref={refs.age}
                style={[styles.input, errors.age && styles.inputError]}
                value={formData.age}
                onChangeText={(text) => handleChange("age", text)}
                placeholder="Enter your age"
                keyboardType="numeric" // Number-only software keyboard
                maxLength={3} // Prevents typing more than 3 characters
                returnKeyType="next"
                onSubmitEditing={() => refs.password.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.age && <Text style={styles.error}>{errors.age}</Text>}
            </View>

            {/* PASSWORD FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Password *</Text>
              <TextInput
                ref={refs.password}
                style={[styles.input, errors.password && styles.inputError]}
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
                placeholder="Enter password"
                secureTextEntry // Masks typed characters with dots for privacy
                returnKeyType="next"
                onSubmitEditing={() => refs.confirmPassword.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </View>

            {/* CONFIRM PASSWORD FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Confirm Password *</Text>
              <TextInput
                ref={refs.confirmPassword}
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                placeholder="Confirm your password"
                secureTextEntry // Masks password input
                returnKeyType="next"
                onSubmitEditing={() => refs.bio.current?.focus()}
                blurOnSubmit={false}
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* BIO FIELD */}
            <View style={styles.field}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                ref={refs.bio}
                style={[
                  styles.input,
                  styles.textArea,
                  errors.bio && styles.inputError,
                ]}
                value={formData.bio}
                onChangeText={(text) => handleChange("bio", text)}
                placeholder="Tell us about yourself..."
                multiline // Enables multi-line text entering (textarea behavior)
                numberOfLines={4}
                textAlignVertical="top" // Aligns placeholder text to top-left on Android
                maxLength={200}
              />
              {/* Dynamic character counter */}
              <Text style={styles.charCount}>
                {formData.bio.length}/200 characters
              </Text>
            </View>

            {/* TERMS AND CONDITIONS SWITCH */}
            <View style={styles.termsContainer}>
              <Switch
                value={agreeToTerms}
                onValueChange={setAgreeToTerms} // Toggles boolean state
                trackColor={{ false: "#767577", true: "#81b0ff" }} // Visual colors for off/on
              />
              <Text style={styles.termsText}>
                I agree to the Terms and Conditions
              </Text>
            </View>
            {errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

            {/* SUBMIT BUTTON CONTAINER */}
            <View style={styles.submitContainer}>
              <Button
                title={isSubmitting ? "Submitting..." : "Create Profile"}
                onPress={handleSubmit}
                disabled={isSubmitting} // Prevents duplicate form submits while processing
                color="#007AFF"
              />
              {/* Renders loading spinner dynamically when form is submitting */}
              {isSubmitting && (
                <ActivityIndicator style={styles.spinner} color="#007AFF" />
              )}
            </View>
          </View>
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
    flexGrow: 1,
    justifyContent: "center", // Vertically centers form on larger screens
  },
  form: {
    padding: 20,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#2c3e50",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc3545", // Red border when validation fails
    borderWidth: 2,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    paddingBottom: 12,
  },
  error: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#6c757d",
    marginTop: 4,
  },
  termsContainer: {
    flexDirection: "row", // Places switch and text side-by-side horizontally
    alignItems: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  termsText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#495057",
  },
  submitContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  spinner: {
    marginTop: 12,
  },
});

export default CompleteFormExample;
