import React, { useContext, useEffect } from "react";
import { SectionList, StyleSheet } from "react-native";
import { Button, Dialog } from "@rneui/base";

import { SearchBar } from "@rneui/themed";
import { HabitElement } from "../../components/HabitElement";
import { Text, View } from "../../components/Themed";
import { AntDesign, Feather } from "@expo/vector-icons";

import { extractTagsFromHabits } from "../../model/Util";
import { AppContext } from "../../model/Store";

export const HabitList = ({ navigation }) => {
  const {
    state: { habits },
  } = useContext(AppContext);
  const [filteredHabits, setFilteredHabits] = React.useState(habits);

  const [search, setSearch] = React.useState("");

  // Update filteredHabits when search changes
  useEffect(() => {
    setFilteredHabits(
      habits.filter((habit) => {
        return habit.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [habits, search]);

  let tagsSet = extractTagsFromHabits(filteredHabits);

  const sectionsByTags = [
    {
      title: "All",
      data: filteredHabits,
    },
    ...Array.from(tagsSet).map((tag) => ({
      title: tag,
      data: filteredHabits.filter((habit) => habit.tags?.includes(tag)),
    })),
  ];

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
        <Button
          style={styles.button}
          title={<AntDesign name="pluscircleo" size={20} color="black" />}
          onPress={() => {
            navigation.navigate("AddEditHabit");
          }}
          type="clear"
        />
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
      </View>

      <SectionList
        sections={sectionsByTags}
        renderItem={({ item }) => (
          <HabitElement habit={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
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
