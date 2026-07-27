// 1. Import necessary React hooks and components
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";

// 2. Define TypeScript Types
// Shape of a single User object from the API
type User = {
  id: number;
  name: string;
};

// Shape of the props passed into this component
type Props = {
  userId: string;
};

// 3. Define the component using TypeScript
const DataFetcher: React.FC<Props> = ({ userId }) => {
  // --- STATE DECLARATIONS ---

  // `data`: Stores the array of users fetched from the API. Starts as an empty array [].
  const [data, setData] = useState<User[]>([]);

  // `loading`: Tracks whether an active network request is in progress (true/false).
  const [loading, setLoading] = useState(false);

  // `count`: Tracks a simple counter to demonstrate component re-renders.
  const [count, setCount] = useState(0);

  // --- USEEFFECT EXAMPLES ---

  // Effect 1: NO dependency array.
  // Runs after the initial render AND after EVERY re-render (e.g., when `count` changes).
  useEffect(() => {
    console.log("Runs every render");
  });

  // Effect 2: EMPTY dependency array `[]`.
  // Runs ONLY ONCE when the component first appears on screen ("mounts").
  useEffect(() => {
    console.log("Runs only once on mount");
  }, []);

  // Effect 3: Dependency array with `[userId]`.
  // Runs on mount AND whenever the value of `userId` changes.
  useEffect(() => {
    // Flag to prevent state updates if the component unmounts while fetching
    let cancelled = false;

    // Async helper function to fetch user data
    const fetchData = async () => {
      setLoading(true); // Show loading indicator
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?id=${userId}`,
        );
        const result: User[] = await response.json();

        // Only update state if the effect hasn't been cancelled/cleaned up
        if (!cancelled) {
          setData(result);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false); // Hide loading indicator
        }
      }
    };

    fetchData();
    console.log("Fetching data for userId:", userId);

    // CLEANUP FUNCTION:
    // Runs before re-running this effect or when the component is unmounted.
    return () => {
      cancelled = true; // Prevents updating state on an unmounted component
    };
  }, [userId]);

  // Effect 4: Subscriptions / Timers with cleanup.
  // Starts a background interval timer when mounted, and stops it when unmounted.
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Timer tick");
    }, 1000);

    // CLEANUP FUNCTION:
    // Essential for stopping intervals or event listeners to prevent memory leaks!
    return () => {
      clearInterval(timer);
      console.log("Timer cleaned up");
    };
  }, []); // Empty array means timer starts once on mount and stops on unmount

  // --- UI RENDER ---
  return (
    <View style={{ padding: 20 }}>
      {/* Conditional Rendering: Show "Loading..." text or the user list */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          )}
        />
      )}

      {/* Button to update local state and trigger a re-render */}
      <Button title="Increment" onPress={() => setCount((prev) => prev + 1)} />
      <Text>Count: {count}</Text>
    </View>
  );
};

export default DataFetcher;
