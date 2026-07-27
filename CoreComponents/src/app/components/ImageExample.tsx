import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function ImageExample() {
  const [localImageError, setLocalImageError] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Image Examples</Text>

      {/* 1. Local image using require */}
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Local Image (require)</Text>
        <Image source={require("./logo.png")} style={styles.localImage} />
      </View>

      {/* 2. Remote image from URL */}
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Remote Image (uri)</Text>
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          style={styles.remoteImage}
        />
      </View>

      {/* 3. Different resizeMode options */}
      <View style={styles.imageContainer}>
        <Text style={styles.label}>resizeMode: 'cover'</Text>
        <Image
          source={{ uri: "https://picsum.photos/400/200" }}
          style={styles.resizeCover}
          resizeMode="cover"
        />
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>resizeMode: 'contain'</Text>
        <Image
          source={{ uri: "https://picsum.photos/400/200" }}
          style={styles.resizeContain}
          resizeMode="contain"
        />
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.label}>resizeMode: 'stretch'</Text>
        <Image
          source={{ uri: "https://picsum.photos/400/200" }}
          style={styles.resizeStretch}
          resizeMode="stretch"
        />
      </View>

      {/* 4. Styled Image with borderRadius */}
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Styled Image (rounded + border)</Text>
        <Image
          source={{ uri: "https://picsum.photos/200/200" }}
          style={styles.styledImage}
        />
      </View>

      {/* 5. Network image with fallback */}
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Image with error handling</Text>
        <Image
          source={{ uri: "https://invalid-url.com/image.jpg" }}
          style={styles.remoteImage}
          onError={() => console.log("Image failed to load")}
          onLoad={() => console.log("Image loaded successfully")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#706e6e",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  localImage: {
    width: 150,
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  remoteImage: {
    width: 200,
    height: 150,
    backgroundColor: "#f0f0f0",
  },
  resizeCover: {
    width: 200,
    height: 150,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resizeContain: {
    width: 200,
    height: 150,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resizeStretch: {
    width: 200,
    height: 150,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  styledImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes it circular
    borderWidth: 3,
    borderColor: "#6200ee",
    backgroundColor: "#f0f0f0",
  },
});

export default ImageExample;
