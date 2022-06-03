import React from "react";
import { SectionList, StyleSheet } from "react-native";
import { HabitElement } from "../../components/HabitElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";

import useUserHabitList from "../../hooks/useUserHabitList";

export const HabitList = ({ navigation }) => {
  const [habits, loading, onUpdate] = useUserHabitList();

  let categoriesSet = new Set(
    habits
      .filter((habit) => habit.category !== null)
      .map((habit) => habit.category)
  );

  const sectionListData = [
    ...[...categoriesSet].map((category) => ({
      title: category ?? "Other",
      data: habits.filter((habit) => habit.category === category),
    })),
  ];

  return (
    <View style={styles.container}>
      {loading && <Text>Loading... (replace this with a spinner)</Text>}
      <SectionList
        sections={sectionListData}
        renderItem={({ item }) => (
          <HabitElement
            habit={item}
            navigation={navigation}
            onDelete={onUpdate}
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
              availableCategories: Array.from(categoriesSet),
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
