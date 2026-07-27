import { useRef, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

function StopWatch() {
  const [time, setTime] = useState(0); // Elapsed time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start / Pause the stopwatch
  const toggleStartPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      const startTime = Date.now() - time;

      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);

      setIsRunning(true);
    }
  };

  // Record a lap time
  const recordLap = () => {
    if (isRunning) {
      setLaps((previousLaps) => [time, ...previousLaps]);
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  // Helper function to format time (Minutes:Seconds.Milliseconds)
  const formatTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);

    const pad = (num: number) => (num < 10 ? `0${num}` : num);

    return {
      mins: pad(minutes),
      secs: pad(seconds),
      ms: pad(milliseconds),
    };
  };

  const { mins, secs, ms } = formatTime(time);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      {/* Title */}
      <Text style={styles.header}>Stopwatch</Text>

      {/* Main Digital Clock Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.timeText}>
          {mins}:{secs}
          <Text style={styles.msText}>.{ms}</Text>
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonRow}>
        {/* Left Button: Lap / Reset */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={isRunning ? recordLap : resetStopwatch}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            {isRunning ? "Lap" : "Reset"}
          </Text>
        </TouchableOpacity>

        {/* Right Button: Start / Stop */}
        <TouchableOpacity
          style={[
            styles.button,
            isRunning ? styles.stopButton : styles.startButton,
          ]}
          onPress={toggleStartPause}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              isRunning ? styles.stopText : styles.startText,
            ]}
          >
            {isRunning ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lap Times List */}
      <View style={styles.lapContainer}>
        <FlatList
          data={laps}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const lapTime = formatTime(item);
            const lapNumber = laps.length - index;

            return (
              <View style={styles.lapRow}>
                <Text style={styles.lapLabel}>Lap {lapNumber}</Text>
                <Text style={styles.lapTime}>
                  {lapTime.mins}:{lapTime.secs}.{lapTime.ms}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    color: "#888888",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1.2,
    marginTop: 10,
    textTransform: "uppercase",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 72,
    fontWeight: "200",
    fontVariant: ["tabular-nums"], // Prevents layout jitter on number changes
  },
  msText: {
    fontSize: 48,
    color: "#888888",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 30,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#0A2A12",
  },
  stopButton: {
    backgroundColor: "#330E0E",
  },
  secondaryButton: {
    backgroundColor: "#212124",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  startText: {
    color: "#4CD964",
  },
  stopText: {
    color: "#FF3B30",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  lapContainer: {
    flex: 1,
    width: "85%",
  },
  lapRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  lapLabel: {
    color: "#888888",
    fontSize: 16,
  },
  lapTime: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    fontVariant: ["tabular-nums"],
  },
});

export default StopWatch;
