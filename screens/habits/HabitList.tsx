import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button } from "@rneui/base";

import { SearchBar } from "@rneui/themed";
import { HabitElement } from "../../components/HabitElement";
import { View } from "../../components/Themed";
import { AntDesign } from "@expo/vector-icons";

import { AppContext } from "../../model/Store";

export const HabitList = ({ navigation }) => {
  const {
    state: { habits },
  } = useContext(AppContext);
  const [filteredHabits, setFilteredHabits] = React.useState(habits);

  const [search, setSearch] = React.useState("");

  useEffect(() => {
    // Filter the habits and sort them by benefit
    const filteredHabits = habits.filter((habit) =>
      habit.name.toLowerCase().includes(search.toLowerCase())
    );
    // Sort the habits by benefit
    const sortedHabits = filteredHabits.sort((a, b) => {
      return b.benefits - a.benefits;
    });

    setFilteredHabits(sortedHabits);
  }, [habits, search]);

  return (
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
            width: "80%",
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
      </View>

      <FlatList
        data={filteredHabits}
        renderItem={({ item }) => (
          <HabitElement habit={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Add a new habit */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
    color: "white",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    opacity: 0.2,
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
});
