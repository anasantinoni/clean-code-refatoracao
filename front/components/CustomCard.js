import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function CustomCard({ title, description, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#A8C8E0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: "#2C2F33",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#A8C8E0",
  },
});