// Import required React and React Native modules
import { useState } from "react";
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type FormFields = "username" | "email" | "password" | "confirmPassword";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<FormFields, string>>;

// Define the RegistrationForm component
const RegistrationForm = () => {
  // State to store form data (username, email, password, confirmPassword)
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to store validation errors for each field
  const [errors, setErrors] = useState<FormErrors>({});

  // Function to update form data and clear errors for a specific field
  const handleChange = (field: FormFields, value: string) => {
    // Update the form data for the specified field
    setFormData((prev) => ({ ...prev, [field]: value }));

    // If there's an error for this field, clear it
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Function to validate the form data
  const validate = () => {
    // Object to store new validation errors
    const newErrors: FormErrors = {};

    // Validate username: Check if it's empty
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Validate email: Check if it's empty or invalid
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Regex to check if email is in a valid format (e.g., user@example.com)
      newErrors.email = "Email is invalid";
    }

    // Validate password: Check if it's empty or too short
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirmPassword: Check if it matches the password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Update the errors state with new validation errors
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate the form data
    if (validate()) {
      // If validation passes, show a success alert
      Alert.alert("Success", "Form submitted successfully!");
      // Log the form data to the console
      console.log("Form data:", formData);
    }
  };

  // Render the form UI
  return (
    <ScrollView style={styles.container}>
      {/* Title of the form */}
      <Text style={styles.title}>Registration</Text>

      {/* Username input field */}
      <TextInput
        style={[styles.input, errors.username && styles.inputError]} // Apply error style if there's an error
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
        placeholder="Username"
        autoCapitalize="none" // Disable auto-capitalization for username
      />
      {/* Display error message for username if it exists */}
      {errors.username && <Text style={styles.error}>{errors.username}</Text>}

      {/* Email input field */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Email"
        keyboardType="email-address" // Optimize keyboard for email input
        autoCapitalize="none" // Disable auto-capitalization for email
      />
      {/* Display error message for email if it exists */}
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      {/* Password input field */}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        placeholder="Password"
        secureTextEntry // Hide password text
      />
      {/* Display error message for password if it exists */}
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      {/* Confirm Password input field */}
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        placeholder="Confirm Password"
        secureTextEntry // Hide confirm password text
      />
      {/* Display error message for confirmPassword if it exists */}
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/* Submit button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

// Define styles for the component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  inputError: {
    borderColor: "#ff4444", // Red border for input fields with errors
  },
  error: {
    color: "#ff4444", // Red color for error messages
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});

// Export the component for use in other files
export default RegistrationForm;
