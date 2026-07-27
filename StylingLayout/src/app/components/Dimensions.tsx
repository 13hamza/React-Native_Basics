import { Dimensions, StyleSheet, Text, View } from "react-native";

const window = Dimensions.get("window");
const { width, height } = window;

const DimensionsExample = () => {
  return (
    <View style={styles.container}>
      <Text>Window Width: {width}</Text>
      <Text>Window Height: {height}</Text>

      <View style={styles.responsiveBox1}>
        <Text>Responsive Box1</Text>
      </View>
      <View style={styles.responsiveBox2}>
        <Text>Responsive Box2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  responsiveBox1: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.2, // 20% of screen height
    backgroundColor: "coral",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  responsiveBox2: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.2, // 20% of screen height
    backgroundColor: "#f76c6c",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
});

export default DimensionsExample;
