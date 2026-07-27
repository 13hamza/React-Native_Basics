import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

/* 
  ========================================================================
  WHAT ARE PROPS? (PROPERTIES)
  ========================================================================
  - Props are how components talk to each other in React.
  - They allow a PARENT component to pass data DOWN to a CHILD component.
  - Props are READ-ONLY (immutable). A child component can receive props and
    display them, but it CANNOT change them directly.
  - Think of props like arguments passed to a regular JavaScript function.
  ========================================================================
*/

// ==========================================
// 1. PARENT COMPONENT
// ==========================================
// This component manages its own state and passes that state down as props.
const UserProfile = () => {
  // Local state variables owned by UserProfile
  const [userName, setUserName] = useState('John Doe');
  const [age, setAge] = useState(25);
  
  return (
    <View style={styles.container}>
      <Text>Parent Component</Text>
      
      {/* 
        PASSING PROPS DOWN:
        We render the <UserInfo /> child component and pass two props to it:
        - `name`: assigned the value of `userName` ("John Doe")
        - `age`: assigned the value of `age` (25)
      */}
      <UserInfo name={userName} age={age} />
      
      {/* 
        Button to update the age in state.
        When state updates, `UserProfile` re-renders and automatically 
        passes the NEW `age` prop down to `UserInfo`.
      */}
      <Button 
        title="Update Age"
        onPress={() => setAge(age + 1)}
      />
    </View>
  );
};

// ==========================================
// 2. CHILD COMPONENT (Receives Props)
// ==========================================
// We use ES6 destructuring ({ name, age }) to unpack the props object passed from the parent.
const UserInfo = ({ name, age }) => {
  // IMPORTANT: Props are READ-ONLY! 
  // You cannot do `name = "Jane"` or `age = age + 1` here.
  
  return (
    <View style={styles.card}>
      {/* Displaying the values received via props */}
      <Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.label}>Age: {age}</Text>
    </View>
  );
};

// ==========================================
// 3. INPUT COMPONENT (Passing Data UP via Callback Props)
// ==========================================
// Props can also be FUNCTIONS passed down from a parent.
// This allows a child to send data back UP to the parent when an event occurs.
const SearchBar = ({ onSearch }) => {
  // Local state PRIVATE to SearchBar (the parent doesn't need to track typing)
  const [searchText, setSearchText] = useState('');
  
  return (
    <View>
      {/* Controlled Input: value comes from state, onChange updates state */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Type to search..."
        style={styles.input}
      />
      
      <Button 
        title="Search"
        onPress={() => {
          // Call the `onSearch` function received via props and pass `searchText` as an argument.
          // This "lifts data up" to the parent component!
          onSearch(searchText); 
          
          // Clear the text input locally
          setSearchText(''); 
        }}
      />
    </View>
  );
};

// ==========================================
// 4. STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { 
    backgroundColor: '#f0f0f0', 
    padding: 15, 
    marginVertical: 10,
    borderRadius: 8 
  },
  label: { fontSize: 16, marginVertical: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10
  }
});

export default UserProfile;