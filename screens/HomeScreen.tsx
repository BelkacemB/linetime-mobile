import { StyleSheet } from "react-native";
import { primaryColor, transparentSecondaryColor } from "../constants/Colors";
import { Text, TouchableOpacity, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Today } from "../components/Today";
import { Avatar } from "react-native-paper";
import React from "react";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const user = "Belkacem";

  return (
    <View style={styles.container}>
      <Today />
      <Text style={styles.welcome}>Hello, {user}</Text>
      <Avatar.Image
        size={110}
        source={require("../assets/images/avatar.jpeg")}
      />
      <Text style={styles.title}>LineTime</Text>
      <View
        style={styles.separator}
        lightColor={primaryColor}
        darkColor="rgba(255,255,255,0.1)"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SuggestionForm")}
      >
        <Text>Suggest activities</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HabitList")}
      >
        <Text>Habit list</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 20,
    fontVariant: ["small-caps"],
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
  button: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: transparentSecondaryColor,
  },
});
