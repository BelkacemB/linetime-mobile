import React, { useState, useEffect, useContext } from "react";
import { Text, View } from "../../components/Themed";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet, TextInput } from "react-native";
import { Divider } from "@rneui/themed";
import { secondaryColor } from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../../model/Store";
import DraggableFlatList from "react-native-draggable-flatlist";

export const AddEditPLaylist = ({ navigation, route }) => {
  const {
    state: { habits },
  } = useContext(AppContext);

  const isEditMode = route.params?.playlist !== undefined;
  const [name, setName] = useState("");
  const [playlistHabits, setPlaylistHabits] = useState([]);
  const [availableHabits, setAvailableHabits] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      setName(route.params.playlist.name);
      setPlaylistHabits(route.params.playlist.habits);
    }
    setAvailableHabits(habits);
  }, []);

  // Everytime a habit is added or removed from the playlist, update the available habits
  useEffect(() => {
    setAvailableHabits(
      habits.filter((habit) => !playlistHabits.includes(habit))
    );
  }, [playlistHabits]);

  return (
    <View>
      <Text>
        <Text style={styles.title}>
          {isEditMode ? "Edit" : "Add new"} playlist
        </Text>
      </Text>
      <Divider />
      {/* Name input */}
      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <MaterialIcons name="title" size={24} color={secondaryColor} />
          Name
        </Text>
        <TextInput
          placeholder="Playlist name"
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.textInput}
          value={name}
        />
      </View>
      {/* Habit selection */}
      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <MaterialIcons name="playlist-add" size={24} color={secondaryColor} />
          Habits
        </Text>
        <SelectDropdown
          data={availableHabits.map((habit) => {
            return habit.name;
          })}
          onSelect={(selectedItem, index) => {
            setPlaylistHabits([...playlistHabits, selectedItem]);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          onChangeSearchInputText={(text) => {
            console.log(text);
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
      {/* Selected habits */}
      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <MaterialIcons
            name="playlist-add-check"
            size={24}
            color={secondaryColor}
          />
          Selected habits
        </Text>
      </View>
      <DraggableFlatList
        data={playlistHabits}
        renderItem={({ item, drag, isActive }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => `draggable-item-${item}`}
        onDragEnd={({ data }) => setPlaylistHabits(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
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
});
