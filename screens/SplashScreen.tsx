import React from "react";
import { View } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Image } from "@rneui/base";

export const SplashScreen = () => {
  return (
    <View style={styles.splashScreen}>
      <Image
        source={require("../assets/images/compact-cassette.png")}
        style={{ width: 100, height: 100 }}
      />
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
