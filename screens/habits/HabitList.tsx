import React from "react";
import { SectionList, StyleSheet } from "react-native";

import { HabitElement } from "../../components/HabitElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";

import useUserHabitList from "../../hooks/useUserHabitList";
import { extractTagsFromHabits } from "../../model/Util";

export const HabitList = ({ navigation }) => {
  const [habits, loading, onUpdate] = useUserHabitList();

  let tagsSet = extractTagsFromHabits(habits);

  const sectionsByTags = [
    {
      title: "All",
      data: habits,
    },
    ...Array.from(tagsSet).map((tag) => ({
      title: tag,
      data: habits.filter((habit) => habit.tags?.includes(tag)),
    })),
  ];

  return (
    <View style={styles.container}>
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
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddHabit", {
              onAdd: onUpdate,
              availableTags: Array.from(tagsSet),
            });
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            ➕ Add new habit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
