// app/screen/SleepScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SleepScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sleep Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
