import { ScrollView, StyleSheet } from "react-native";
import { primaryColor } from "../constants/Colors";
import { Text, TouchableOpacity, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Today } from "../components/Today";
import { Avatar } from "@rneui/themed";
import React, { useEffect } from "react";
import { Badge, Button, Image } from "@rneui/base";
import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Entypo from "@expo/vector-icons/build/Entypo";
import useHabitTags from "../hooks/useHabitTags";
import { AppContext } from "../model/Store";
import useUserToken from "../hooks/useUserToken";
import useUserId from "../hooks/useUserId";
import { isFemaleUser } from "../model/Util";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const userToken = useUserToken();
  const userId = useUserId();
  const { state, dispatch } = React.useContext(AppContext);

  useEffect(() => {
    if (userToken && userId) {
      dispatch({ type: "SET_TOKEN", token: userToken });
      dispatch({ type: "SET_USER_ID", userId });
    }
  }, [userToken, userId, dispatch]);

  const { tags } = useHabitTags(state.habits);
  // Username is the first 8 characters of the userId
  const username = userId.substring(0, 8);

  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
  });

  const userSignOut = () => {
    signOut(auth);
  };

  const avatar = isFemaleUser(userId)
    ? require("../assets/images/avatar-woman.png")
    : require("../assets/images/avatar-man.png");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        onPress={() => userSignOut()}
        title="Sign Out"
        type="outline"
        style={{
          marginBottom: 10,
        }}
      />
      <Today />
      <Text style={styles.welcome}>Hello, {username}</Text>
      <Avatar size={110} rounded source={avatar} />
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
              <Badge status="success" /> {state.habits?.length} habits
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Badge status="primary" /> {tags?.length} tags
            </Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/compact-cassette.png")}
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
      <View
        style={styles.separator}
        lightColor={primaryColor}
        darkColor="rgba(255,255,255,0.1)"
      />
      {fontsLoaded && (
        <Text style={styles.quote}>“Do small things in a great way.”</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    margin: 5,
    padding: 5,
    backgroundColor: "#fff",
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
  quote: {
    fontSize: 25,
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
});
