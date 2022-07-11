import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button, Dialog } from "@rneui/base";

import { SearchBar, Text } from "@rneui/themed";
import { HabitElement } from "../../components/HabitElement";
import { TouchableOpacity, View } from "../../components/Themed";
import { AntDesign, Feather } from "@expo/vector-icons";

import { AppContext } from "../../model/Store";
import Habit from "../../model/Habit";
import { reloadAndDispatch } from "../../model/Util";
import useHabitTags from "../../hooks/useHabitTags";
import { SelectChip } from "../../components/SelectChip";

export const HabitList = ({ navigation }) => {
  const {
    state: { habits: allHabits, token, userId },
    dispatch,
  } = useContext(AppContext);

  const [searchText, setSearchText] = React.useState("");
  const [filteredHabits, setFilteredHabits] = React.useState(allHabits);
  const [habitToDelete, setHabitToDelete] = React.useState(null);
  const { tags, selectedTags, toggleTagSelection } = useHabitTags(allHabits);

  useEffect(() => {
    // Filter on selected tags
    let searchedHabits = filteredHabits;
    if (selectedTags.length > 0) {
      searchedHabits = allHabits.filter((habit) => {
        return selectedTags.every((tag) => habit.tags?.includes(tag));
      });
    } else {
      searchedHabits = allHabits;
    }

    searchedHabits = searchedHabits.filter((habit) =>
      habit.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredHabits(searchedHabits);
  }, [selectedTags, searchText]);

  const removeHabit = (habit: Habit) => {
    dispatch({ type: "DELETE_HABIT", habit });
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => {
          setHabitToDelete(data.item);
        }}
      >
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          navigation.navigate("AddEditHabit", {
            habit: data.item,
          });
        }}
      >
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          data.item.clockIn();
          dispatch({ type: "UPDATE_HABIT", habit: data.item });
          rowMap[data.item.id].closeRow();
        }}
      >
        <AntDesign name="check" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Dialog
        isVisible={habitToDelete !== null}
        onBackdropPress={() => {
          setHabitToDelete(null);
        }}
        overlayStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title title="Delete habit" />
        <Text>
          Are you sure you want to delete the habit "{habitToDelete?.name}"?
        </Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Yes"
            onPress={() => {
              removeHabit(habitToDelete);
              setHabitToDelete(null);
            }}
          />
          <Dialog.Button
            title="No"
            onPress={() => {
              setHabitToDelete(null);
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <View>
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
              navigation.navigate("AddEditHabit");
            }}
            type="clear"
          />
          <Button
            style={styles.button}
            title={<Feather name="refresh-ccw" size={20} color="black" />}
            onPress={() => {
              reloadAndDispatch(userId, token, dispatch);
            }}
            type="clear"
          />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            alignItems: "center",
            height: 90,
            borderBottomColor: "gray",
            borderBottomWidth: 0.2,
            marginLeft: 10,
          }}
          horizontal
        >
          <Text style={{ fontWeight: "bold" }}>Filter by tags </Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: "row" }}>
              {tags.map((tag) => (
                <SelectChip
                  label={tag.toLowerCase()}
                  key={tag}
                  onPress={() => {
                    toggleTagSelection(tag);
                  }}
                  selected={selectedTags.includes(tag)}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <SwipeListView
          data={filteredHabits}
          renderItem={({ item }) => (
            <HabitElement habit={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    color: "white",
    backgroundColor: "white",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
    opacity: 0,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomColor: "#ccc",
  },
  button: {
    margin: 5,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    right: 75,
  },
  backRightBtnRight: {
    right: 0,
  },
});
