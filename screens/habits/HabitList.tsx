import React, { useEffect } from "react";
import { Button, SectionList, StyleSheet } from "react-native";

import { SearchBar } from "@rneui/themed";
import { HabitElement } from "../../components/HabitElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";

import useUserHabitList from "../../hooks/useUserHabitList";
import { extractTagsFromHabits } from "../../model/Util";

export const HabitList = ({ navigation }) => {
  const [habits, loading, onUpdate] = useUserHabitList();
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
      <SearchBar
        lightTheme
        round
        placeholder="Search"
        onChangeText={(text) => setSearch(text)}
        value={search}
        style={{ width: "100%" }}
      />

      {loading && (
        <Text>Loading... (replace this with a spinner or a skeleton)</Text>
      )}
      <SectionList
        sections={sectionsByTags}
        renderItem={({ item }) => (
          <HabitElement
            habit={item}
            navigation={navigation}
            onUpdateOrDelete={onUpdate}
          />
        )}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
      {/* Add a new habit */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          title="➕ Add new habit"
          onPress={() => {
            navigation.navigate("AddHabit", {
              onAdd: onUpdate,
            });
          }}
        />
        <Button title="🔄 Refresh" onPress={onUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 5,
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
});
