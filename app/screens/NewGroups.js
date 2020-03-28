import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NewGroups() {
  return (
    <View>
      <Text style={styles.text}>Nuevos Grupos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 20
  }
});
