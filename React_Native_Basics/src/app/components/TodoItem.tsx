import { memo, useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/*
  ========================================================================
  PERFORMANCE HOOKS & CONCEPTS EXPLAINED
  ========================================================================
  
  1️⃣ useState:
     - Keeps track of component-level data that changes over time (e.g., list of todos).
     - Whenever state updates, React re-renders the component to show updated UI.

  2️⃣ memo (React.memo):
     - Wraps a component to make it "memoized" (remembered).
     - React skips re-rendering this component if its PROPS haven't changed!
     - Great for performance in long lists like FlatList.

  3️⃣ useCallback:
     - In JavaScript, `() => {}` creates a NEW function instance in memory on every render.
     - If you pass a new function down to a `memo` child, the child thinks "My props changed!" and re-renders anyway.
     - `useCallback` freezes (caches) the function instance so it stays identical across renders unless dependencies change.
  ========================================================================
*/

// Define the shape of a Todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the props required by the TodoItem component
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// 🚀 MEMOized CHILD COMPONENT
// We wrap `TodoItem` in `memo()`. It will ONLY re-render if `todo`, `onToggle`, or `onDelete` change.
const TodoItem = memo<TodoItemProps>(({ todo, onToggle, onDelete }) => {
  // Console log to observe in terminal when this specific item re-renders
  console.log(`Todo ${todo.id} rendered`);

  return (
    <View style={[styles.todoItem, todo.completed && styles.completed]}>
      {/* Tap text to toggle completion status */}
      <TouchableOpacity onPress={() => onToggle(todo.id)}>
        <Text style={styles.todoText}>{todo.text}</Text>
      </TouchableOpacity>
      
      {/* Tap 'X' to delete todo */}
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
});

// MAIN PARENT COMPONENT
const TodoList = () => {
  // Local state to store array of todos
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React Native", completed: false },
    { id: 2, text: "Build an app", completed: false },
  ]);

  // Local state to track current filter category
  const [filter, setFilter] = useState("all");

  // Counter state used to force the main component to re-render for testing performance
  const [count, setCount] = useState(0);

  // ❌ BAD EXAMPLE (Commented out): Without useCallback
  // Every time `count` or `filter` changes, this function gets a new memory address.
  // Passing this to `<TodoItem />` breaks `memo` and causes all items to re-render needlessly!
  /*
  const handleToggleWithoutCallback = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  */

  // ✅ GOOD EXAMPLE: With useCallback (No dependencies)
  // We use a functional state update `prevTodos => ...` so we don't need `todos` in the dependency array `[]`.
  // This function stays exactly the same in memory FOREVER.
  const handleToggle = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []); // Empty array = function reference never changes

  // ✅ WITH useCallback: Delete todo item
  const handleDelete = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []); // Empty array = function reference never changes

  // ✅ Helper function to return filtered array based on active filter tab
  const filteredTodos = useCallback(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]); // Re-computes whenever `todos` or `filter` changes

  // ✅ CRITICAL: Memoizing the renderItem callback for FlatList
  // Prevents FlatList from rebuilding the item layout function on every re-render.
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem todo={item} onToggle={handleToggle} onDelete={handleDelete} />
    ),
    [handleToggle, handleDelete] // These functions are stable, so renderItem is also stable!
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      {/* Counter button to prove performance optimization:
          Clicking this updates `count` and re-renders `TodoList`, 
          BUT `TodoItem` components will NOT re-render because of memo + useCallback! */}
      <TouchableOpacity onPress={() => setCount((c) => c + 1)}>
        <Text style={styles.counter}>Counter: {count} (click me)</Text>
      </TouchableOpacity>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {["all", "active", "completed"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.activeFilter]}
            onPress={() => setFilter(f)}
          >
            <Text style={styles.filterText}>{f.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Optimized FlatList */}
      <FlatList
        data={filteredTodos()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={todos} // Tells FlatList to re-render items when `todos` state updates
      />
    </View>
  );
};

// Component Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  counter: {
    fontSize: 16,
    color: "blue",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  filterBtn: { padding: 8, borderRadius: 6 },
  activeFilter: { backgroundColor: "#007AFF" },
  filterText: { fontWeight: "bold" },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
  },
  completed: { opacity: 0.5 },
  todoText: { fontSize: 16 },
  deleteText: { color: "red", fontSize: 18 },
});

export default TodoList;