import React, { useContext } from "react";
import Playlist from "../model/Playlist";
import { AppContext } from "../model/Store";
import { secondaryColor } from "../constants/Colors";
type PlaylistProps = {
  playlist: Playlist;
  navigation: any;
};
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";

export const PlaylistElement = ({ playlist, navigation }: PlaylistProps) => {
  const { dispatch } = useContext(AppContext);

  const edit = () => {
    navigation.navigate("AddEditPlaylist", {
      playlist: playlist,
    });
  };

  const remove = () => {
    dispatch({ type: "DELETE_PLAYLIST", playlist: playlist });
  };

  return (
    <>
      <View style={styles.playlistElement}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 1,
            paddingBottom: 5,
            alignItems: "center",
          }}
          onPress={() => {
            edit();
          }}
        >
          <View style={{ width: "35%" }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              {playlist.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              remove();
            }}
          >
            <AntDesign name="delete" size={18} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  playlistElement: {
    width: "100%",
    minHeight: 60,
    padding: 10,
    marginBottom: 2,
    shadowColor: secondaryColor,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 6 },
  },
});
