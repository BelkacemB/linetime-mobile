import React, { useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import SelectDropdown from "react-native-select-dropdown";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Divider } from "@rneui/themed";
import { secondaryColor } from "../../constants/Colors";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../../model/Store";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Button } from "@rneui/base";
import Playlist from "../../model/Playlist";
import Habit from "../../model/Habit";

export const AddEditPlaylist = ({ navigation, route }) => {
  const {
    state: { habits },
    dispatch,
  } = useContext(AppContext);

  const isEditMode = route.params?.playlist !== undefined;

  const initHabits: Habit[] = isEditMode
    ? route.params.playlist.habits.map((habitId) =>
        habits.find((habit) => habit.id === habitId)
      )
    : [];

  const initName = isEditMode ? route.params.playlist.name : "";

  const [name, setName] = useState(initName);
  const [playlistHabits, setPlaylistHabits] = useState(initHabits);
  const [availableHabits, setAvailableHabits] = useState([]);

  useEffect(() => {
    setAvailableHabits(
      habits.filter((habit) => !playlistHabits.includes(habit))
    );
  }, [playlistHabits]);

  const registerPlaylist = () => {
    if (isEditMode) {
      let updatedPlaylist = new Playlist(route.params.playlist.id, name);
      updatedPlaylist.habits = playlistHabits.map((habit) => habit.id);
      dispatch({
        type: "UPDATE_PLAYLIST",
        playlist: updatedPlaylist,
      });
    } else {
      const playlist = new Playlist("", name);
      playlistHabits.forEach((habit) => playlist.addHabit(habit.id));
      dispatch({ type: "ADD_PLAYLIST", playlist: playlist });
    }
  };

  const onRemoveHabit = (habit: Habit) => {
    setPlaylistHabits(playlistHabits.filter((h) => h.id !== habit.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? "Edit Playlist" : "Add Playlist"}
      </Text>
      <Divider />
      {/* Playlist Name */}
      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <MaterialIcons name="title" size={24} color={secondaryColor} />
          Name:
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>
      {/* Playlist Habits */}
      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <MaterialIcons name="playlist-add" size={24} color={secondaryColor} />
          Habits
        </Text>
        <SelectDropdown
          data={availableHabits}
          onSelect={(selectedItem, index) => {
            setPlaylistHabits([...playlistHabits, selectedItem]);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
          onChangeSearchInputText={(text) => {
            setAvailableHabits(
              habits.filter((habit) =>
                habit.name.toLowerCase().includes(text.toLowerCase())
              )
            );
          }}
          buttonStyle={styles.textInput}
          buttonTextStyle={{ color: "black" }}
          renderDropdownIcon={() => {
            return (
              <MaterialIcons name="add" size={24} color={secondaryColor} />
            );
          }}
          search={true}
        />
      </View>

      {/* Playlist Habits List */}
      <Text style={styles.title}>Habits in Playlist</Text>
      <DraggableFlatList
        data={playlistHabits}
        renderItem={({ item, drag, isActive }) => {
          return (
            <RowItem
              item={item.name}
              drag={drag}
              isActive={isActive}
              onRemove={() => onRemoveHabit(item)}
            />
          );
        }}
        keyExtractor={(item, index) => `draggable-item-${index}`}
        onDragEnd={({ data }) => setPlaylistHabits(data)}
        style={{ maxHeight: "50%" }}
      />

      <Button
        onPress={() => {
          registerPlaylist();
          navigation.goBack();
        }}
        title={
          <Text style={{ fontSize: 16 }}>
            <Entypo name="save" size={16} color="black" /> Save
          </Text>
        }
        buttonStyle={{ backgroundColor: "white", ...styles.button }}
        color={secondaryColor}
        titleStyle={{ color: "black" }}
      />
    </View>
  );
};

const RowItem = ({ item, drag, isActive, onRemove }) => {
  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        backgroundColor: isActive ? secondaryColor : "white",
        padding: 10,
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item}</Text>
      <TouchableOpacity
        onPress={() => {
          onRemove();
        }}
      >
        <AntDesign name="delete" size={18} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  formLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    width: "95%",
  },
  formLineText: {
    fontSize: 18,
    marginHorizontal: 2,
  },
  textInput: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 8,
    borderColor: "#eee",
    fontWeight: "bold",
    minWidth: "15%",
  },
  button: {
    margin: 10,
    width: "80%",
    shadowOpacity: 0.2,
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
  },
  separator: {
    backgroundColor: secondaryColor,
    marginVertical: 15,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
});
