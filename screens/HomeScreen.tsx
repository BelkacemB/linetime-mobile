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
import { Button, Card } from "@rneui/base";

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
      <View style={{ flexDirection: "row", width: "100%" }}>
          <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate("HabitList")} style={{backgroundColor: 'transparent'}}>
        
            <Card.Title>PLAYLIST</Card.Title>
            <Card.Divider />
            <View style={{ backgroundColor: 'transparent', alignItems: 'center'}}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>16</Text>
            <Text style={{ fontSize: 16 }}>habits</Text>
            <Text style={{ fontSize: 16 }}> </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>5</Text>
            <Text style={{ fontSize: 16 }}>tags</Text>
            <Text style={{ fontSize: 16 }}> </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Last update
            </Text>
            <Text style={{ fontSize: 16 }}>04/07/2022</Text>
            </View>
            </TouchableOpacity>
          </Card>
          <Card containerStyle={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate("SuggestionForm")} style={{backgroundColor: 'transparent'}}>

            <Card.Title>PLAY</Card.Title>
            <Card.Divider />
            <Card.Image source={require("../assets/images/playlist.png")} />
        </TouchableOpacity>

          </Card>
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
  card: {
    width: "40%",
    borderWidth: 1,
    padding: 0,
    paddingVertical: 5,
    justifyContent: "center",
    shadowColor: secondaryColor,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    backgroundColor: tertiaryColor,
    borderRadius: 10,
  }
});
