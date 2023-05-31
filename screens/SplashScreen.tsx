import React from "react";
import { Text, View } from "../components/Themed";
import { StyleSheet } from "react-native";

export const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Text style={{ fontSize: 40 }}>LineTime</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
