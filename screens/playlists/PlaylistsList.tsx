import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { AppContext } from "../../model/Store";
import { SearchBar } from "@rneui/themed";
import { Button } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import { PlaylistElement } from "../../components/PlaylistElement";

export const PlaylistsList = ({ navigation }) => {
  const {
    state: { playlists: allPlaylists },
    dispatch,
  } = useContext(AppContext);

  const [searchText, setSearchText] = React.useState("");
  const [filteredPlaylists, setFilteredPlaylists] =
    React.useState(allPlaylists);

  React.useEffect(() => {
    setFilteredPlaylists(
      allPlaylists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, allPlaylists]);

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
      </View>
      <SwipeListView
        data={filteredPlaylists}
        renderItem={({ item }) => (
          <PlaylistElement
            playlist={item}
            navigation={navigation}
            key={item.id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
  },
});
