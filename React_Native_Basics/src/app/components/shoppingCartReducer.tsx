import { useReducer, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

/*
  ========================================================================
  WHAT IS useReducer?
  ========================================================================
  - `useReducer` is an alternative to `useState` for managing complex state logic.
  - Think of it like a central state manager for your component.
  - Instead of updating variables directly (like `setCount(5)`), you dispatch an
    "ACTION" object describing what happened (e.g., `{ type: 'ADD_ITEM' }`).
  - A "REDUCER FUNCTION" then listens for that action, decides how the state 
    should change, and returns the updated state object.

  WHEN TO USE IT:
  1. When your state is complex (like objects or arrays with nested values).
  2. When the next state depends on the previous state.
  3. When multiple actions update the same piece of state (Add, Remove, Update, Clear).
  ========================================================================
*/

// 1️⃣ THE REDUCER FUNCTION
// A pure function that takes (current state, action) and returns the NEW state.
const shoppingCartReducer = (state, action) => {
  // Check what action was dispatched using a switch statement
  switch (action.type) {
    case "ADD_ITEM": {
      // Check if the item already exists in our cart array
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // If it exists, increase its quantity by 1 instead of adding a duplicate row
        return {
          ...state, // Copy existing state properties
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
          totalItems: state.totalItems + 1, // Increment overall item count
        };
      }

      // If it's a brand new item, append it to the items array with an initial quantity of 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalItems: state.totalItems + 1,
      };
    }

    case "REMOVE_ITEM": {
      // Find the item to remove so we know its quantity
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload,
      );

      if (!itemToRemove) return state; // If not found, make no changes

      // Filter out the item matching the payload ID
      const newItems = state.items.filter((item) => item.id !== action.payload);

      return {
        ...state,
        items: newItems,
        totalItems: state.totalItems - itemToRemove.quantity, // Deduct its quantity from total
      };
    }

    case "UPDATE_QUANTITY": {
      // Find the target item
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return state;

      // Prevent quantity from dropping below 0
      const newQuantity = Math.max(0, action.payload.quantity);
      // Calculate the difference between new quantity and current quantity
      const delta = newQuantity - item.quantity;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: newQuantity }
            : item,
        ),
        totalItems: state.totalItems + delta, // Adjust total items by the difference
      };
    }

    case "CLEAR_CART":
      // Reset state back to empty defaults
      return {
        items: [],
        totalItems: 0,
      };

    default:
      // If an unknown action type is dispatched, return state unchanged
      return state;
  }
};

// 2️⃣ THE COMPONENT
const ShoppingCart = () => {
  // Define the starting values for our reducer's state
  const initialState = {
    items: [],
    totalItems: 0,
  };

  /*
    useReducer hook initialization:
    - `state`: Holds the current cart data ({ items: [...], totalItems: 0 }).
    - `dispatch`: A trigger function used to send actions to our reducer.
  */
  const [state, dispatch] = useReducer(shoppingCartReducer, initialState);

  // Local state managed via `useState` for handling raw text inputs in the form
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  // Handler to dispatch an ADD_ITEM action
  const addItem = () => {
    // Validate inputs
    if (!newItemName || !newItemPrice) return;

    // Send an action object with type and payload data to the reducer
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: Date.now().toString(), // Quick way to generate a unique string ID
        name: newItemName,
        price: parseFloat(newItemPrice),
      },
    });

    // Reset input fields
    setNewItemName("");
    setNewItemPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {/* Read total items straight from reducer state */}
      <Text>Total Items: {state.totalItems}</Text>

      {/* Add Item Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={newItemPrice}
          onChangeText={setNewItemPrice}
          keyboardType="numeric"
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      {/* Cart Items List */}
      <FlatList
        data={state.items} // Render the array of cart items from reducer state
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
            <Text>Qty: {item.quantity}</Text>

            <View style={styles.buttonGroup}>
              {/* Increase quantity */}
              <Button
                title="+"
                onPress={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity + 1 },
                  })
                }
              />
              {/* Decrease quantity */}
              <Button
                title="-"
                onPress={() =>
                  dispatch({
                    type: "UPDATE_QUANTITY",
                    payload: { id: item.id, quantity: item.quantity - 1 },
                  })
                }
              />
              {/* Remove item completely */}
              <Button
                title="Remove"
                color="red"
                onPress={() =>
                  dispatch({
                    type: "REMOVE_ITEM",
                    payload: item.id,
                  })
                }
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Clear whole cart */}
      <Button
        title="Clear Cart"
        color="red"
        onPress={() => dispatch({ type: "CLEAR_CART" })}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  cartItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: { fontSize: 16, fontWeight: "bold" },
  buttonGroup: {
    flexDirection: "row",
    justify: "space-around",
    marginTop: 10,
  },
});

export default ShoppingCart;
