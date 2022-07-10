import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button, Dialog } from "@rneui/base";

import { SearchBar, Text } from "@rneui/themed";
import { HabitElement } from "../../components/HabitElement";
import { TouchableOpacity, View } from "../../components/Themed";
import { AntDesign, Feather } from "@expo/vector-icons";

import { AppContext } from "../../model/Store";
import Habit from "../../model/Habit";
import { reloadAndDispatch } from "../../model/Util";

export const HabitList = ({ navigation }) => {
  const {
    state: { habits, token, userId },
    dispatch,
  } = useContext(AppContext);

  const [filteredHabits, setFilteredHabits] = React.useState(habits);
  const [search, setSearch] = React.useState("");
  const [habitToDelete, setHabitToDelete] = React.useState(null);

  const removeHabit = (habit: Habit) => {
    dispatch({ type: "DELETE_HABIT", habit });
  };

  useEffect(() => {
    const filteredHabits = habits.filter((habit) =>
      habit.name.toLowerCase().includes(search.toLowerCase())
    );
    const sortedHabits = filteredHabits.sort((a, b) => {
      return b.benefits - a.benefits;
    });

    setFilteredHabits(sortedHabits);
  }, [habits, search]);

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
      <View style={styles.container}>
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
            onChangeText={(text) => setSearch(text)}
            value={search}
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
          key={habits.length}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    color: "white",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
    opacity: 1,
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
