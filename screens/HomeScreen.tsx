import { StyleSheet } from "react-native";
import {
  primaryColor,
  secondaryColor,
  tertiaryColor,
} from "../constants/Colors";
import { Text, TouchableOpacity, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Today } from "../components/Today";
import { Avatar } from "@rneui/themed";
import React from "react";
import { Badge, Button, Image } from "@rneui/base";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useUserId from "../hooks/useUserId";
import Entypo from "@expo/vector-icons/build/Entypo";
import useUserHabitList from "../hooks/useUserHabitList";
import useHabitTags from "../hooks/useHabitTags";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const user = useUserId().slice(0, 8);

  const { habits } = useUserHabitList();
  const { tags } = useHabitTags();

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
      <Text style={styles.welcome}>Hello, Belkacem</Text>
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
      <View style={{ flexDirection: "row", width: "95%" }}>
        <TouchableOpacity
          style={{
            width: "70%",
            flexDirection: "row",
            justifyContent: "space-between",
            ...styles.card,
          }}
          onPress={() => navigation.navigate("HabitList")}
        >
          <View style={{ flexDirection: "column", width: "40%" }}>
            <Text style={styles.welcome}>Playlist</Text>
            <Text>{}</Text>
            <Text style={{ fontSize: 16 }}>
              <Badge status="success" /> {habits?.length} habits
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Badge status="primary" /> {tags?.length} tags
            </Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/playlist.png")}
              style={{ width: 130, height: 100 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SuggestionForm")}
          style={{ width: "25%", ...styles.card }}
        >
          <Text style={styles.welcome}>Play</Text>
          <Entypo name="shuffle" size={40} color="black" />
        </TouchableOpacity>
      </View>
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
    marginVertical: 15,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
  card: {
    borderWidth: 0.2,
    padding: 5,
    margin: 5,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    borderRadius: 10,
  },
});
