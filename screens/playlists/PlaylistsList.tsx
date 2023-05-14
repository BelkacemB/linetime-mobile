import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import { AppContext } from "../../model/Store";
import { SearchBar } from "@rneui/themed";
import { Button } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

export const PlaylistsList = ({ navigation }) => {
  const {
    state: { playlists: allPlaylists },
    dispatch,
  } = useContext(AppContext);

  console.log("allPlaylists", allPlaylists);

  const [searchText, setSearchText] = React.useState("");
  const [filteredPlaylists, setFilteredPlaylists] =
    React.useState(allPlaylists);

  return (
    <View style={{ flexDirection: "column", alignContent: "center" }}>
      {/* Search bar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <SearchBar
          lightTheme
          round
          placeholder="Search"
          onChangeText={setSearchText}
          value={searchText}
          containerStyle={{
            width: "70%",
            height: "100%",
            backgroundColor: "white",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
        />
        <Button
          style={styles.button}
          title={<AntDesign name="pluscircleo" size={20} color="black" />}
          onPress={() => {
            navigation.navigate("AddEditPlaylist");
          }}
          type="clear"
        />

        <SwipeListView
          data={filteredPlaylists}
          renderItem={({ item }) => (
            <Text
            >
              {item.name}
            </Text>
          )}
        />
              
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
});
