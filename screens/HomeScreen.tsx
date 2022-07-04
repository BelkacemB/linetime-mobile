import { StyleSheet } from "react-native";
import { primaryColor, secondaryColor } from "../constants/Colors";
import { Text, TouchableOpacity, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Today } from "../components/Today";
import { Avatar } from "@rneui/themed";
import React from "react";
import { Button } from "@rneui/base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useUserId from "../hooks/useUserId";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const user = useUserId().slice(0, 8);

  const userSignOut = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => userSignOut()}
        title="Sign Out"
        type="outline"
        style={{
          marginBottom: 10,
        }}
      />
      <Today />
      <Text style={styles.welcome}>Hello, {user}</Text>
      <Avatar
        size={110}
        rounded
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
        <Text>Play</Text>
        <AntDesign name="playcircleo" size={30} color={secondaryColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HabitList")}
      >
        <Text>Habit playlist</Text>
        <MaterialCommunityIcons
          name="playlist-edit"
          size={30}
          color={secondaryColor}
        />
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
    shadowOpacity: 0.2,
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
  },
});
