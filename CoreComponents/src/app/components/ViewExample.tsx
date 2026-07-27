import React from "react";
import { StyleSheet, Text, View } from "react-native";
function ViewExample() {
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.title}>My App</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Card 1</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Card 2</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#c0bcdf",
  },
  Header: {
    height: 100,
    backgroundColor: "#8776ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  title: {
    color: "#f1f2f4",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  card: {
    width: 150,
    height: 200,
    backgroundColor: "#8776ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    // Add shadow for iOS
    shadowColor: "#0a0a0a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Add elevation for Android
    elevation: 20,
  },
  cardText: {
    color: "#f1f2f4",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    height: 100,
    backgroundColor: "#8776ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  footerText: {
    color: "#f1f2f4",
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default ViewExample;

