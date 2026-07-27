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
  CORE CONCEPTS EXPLAINED FOR BEGINNERS
  ========================================================================

  1. useState:
     - Component Memory: Stores variables that change over time (like a list of items or a counter).
     - Trigger UI Updates: Whenever state changes using its updater function (e.g., `setTodos`), 
       React automatically re-renders the screen to show updated data.

  2. React.memo (memo):
     - Performance Shield: Stops a child component from re-rendering if its props (inputs) haven't changed.
     - Saves Power: If a parent component re-renders, React normally re-renders all child components too.
       Wrapping a component in `memo` tells React: "Skip re-rendering this child unless its props actually change."

  3. useCallback:
     - Function Memory (Caching): In JavaScript, every time a component re-renders, all functions inside it 
       are recreated from scratch at new memory addresses.
     - Keeps `memo` Working: If you pass a newly created function into a `memo` child component, the child 
       thinks "I received a new prop!" and re-renders anyway. `useCallback` keeps the same function reference 
       in memory across re-renders so `memo` can do its job.
  ========================================================================
*/

// Define the shape (type) of a Todo item for TypeScript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 🚀 MEMOIZED CHILD COMPONENT
// We wrap `TodoItem` inside `memo()`.
// This component will ONLY re-render if `todo`, `onToggle`, or `onDelete` props actually change.
const TodoItem = memo(
  ({
    todo,
    onToggle,
    onDelete,
  }: {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }) => {
    // Console log to trace performance: check when individual items re-render in terminal
    console.log(`Todo ${todo.id} rendered`);

    return (
      <View style={[styles.todoItem, todo.completed && styles.completed]}>
        {/* Toggle todo completed status on press */}
        <TouchableOpacity onPress={() => onToggle(todo.id)}>
          <Text style={styles.todoText}>{todo.text}</Text>
        </TouchableOpacity>

        {/* Delete todo on press */}
        <TouchableOpacity onPress={() => onDelete(todo.id)}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    );
  },
);

// MAIN PARENT COMPONENT
const TodoList = () => {
  // 1️⃣ `useState`: Holds our array of todo items
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React Native", completed: false },
    { id: 2, text: "Build an app", completed: false },
  ]);

  // Tracks active filter state ('all' | 'active' | 'completed')
  const [filter, setFilter] = useState("all");

  // Counter state to demonstrate performance behavior during re-renders
  const [count, setCount] = useState(0);

  // ❌ WITHOUT useCallback (Example of what NOT to do):
  // Every time `count` or `filter` changes, this function gets recreated with a new memory address.
  // Passing it to `<TodoItem />` breaks `memo`, forcing all list items to re-render needlessly!
  /*
  const handleToggleWithoutCallback = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  */

  // ✅ WITH useCallback: Toggle Todo Completion
  // Using functional state updates (`prevTodos => ...`) removes the need to add `todos` to the dependency array.
  // The empty array `[]` means this function reference NEVER changes across re-renders.
  const handleToggle = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []); // Empty dependency array = function reference stays stable forever

  // ✅ WITH useCallback: Delete Todo
  const handleDelete = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []); // Empty dependency array = function reference stays stable forever

  // ✅ Helper function to return filtered array of todos
  // Re-runs only when `todos` or `filter` changes.
  const filteredTodos = useCallback(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // ✅ CRITICAL PERFORMANCE STEP: Memoize FlatList `renderItem`
  // Stops `FlatList` from recreating the rendering instruction on every render cycle.
  const renderItem = useCallback(
    ({ item }: { item: Todo }) => (
      <TodoItem todo={item} onToggle={handleToggle} onDelete={handleDelete} />
    ),
    [handleToggle, handleDelete], // Dependencies are stable, making `renderItem` stable
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      {/* Counter Button:
          Clicking this updates `count` and forces `TodoList` to re-render.
          Because of `memo` + `useCallback`, you will notice `TodoItem` 
          components do NOT log "Todo X rendered" again in terminal! */}
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
        extraData={todos} // Tells FlatList to refresh when the todos state updates
      />
    </View>
  );
};

// Styling Rules
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
