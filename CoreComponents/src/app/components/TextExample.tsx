import React from 'react';
import {Linking, StyleSheet, Text, View } from 'react-native';

function TextExample() {
    return (
        <View style={styles.container}>
            <Text style={styles.BasicText}>Hello, React Native!</Text>
        <Text style={styles.nestedText}>
            This is <Text style={styles.boldText}>nested</Text> text.
        </Text>
        <Text style={styles.italicText}>This text is italic.</Text>
        <Text style={styles.heading}>Heading 1</Text>
        <Text style={styles.subheading}>Subheading </Text>
        <Text style={styles.bodyText}>This is the body text. How are you what are you doing? what did you feel about do day?</Text>
        <Text style={styles.multilineText}>
            First line of text.{"\n"}
            Second line of text.{"\n"}
            Third line of text. 
        </Text>
        <Text style={styles.linkText}
        onPress={() => Linking.openURL('https://www.google.com')}>
        Click here to learn more</Text>
        </View>
);       
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#c0bcdf",
    },
    BasicText: {
        fontSize: 18,
        color: "#333",
        marginBottom: 10,
    },
    nestedText: {
        fontSize: 16,
        color: "#555",
        marginBottom: 10,
    },
    boldText: {
        fontWeight: "bold",
        color: "#000",
    },
    italicText: {
        fontStyle: "italic",
        color: "#777",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 10,
    },
    subheading: {
        fontSize: 20,
        fontWeight: "600",
        color: "#444",
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#666",
        marginBottom: 10,
    },
    multilineText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#666",
        marginBottom: 10,
    },
    linkText: {
        fontSize: 16,
        color: "#1e90ff",
        textDecorationLine: "underline",
        marginTop: 30,
    },

});
export default TextExample;