import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { HabitElement } from "../../components/HabitElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import useHabitList from "../../hooks/useHabitList";

export const HabitList = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const [habits, loading, onUpdate] = useHabitList(user.uid);

  let categoriesSet = new Set(
    habits
      .filter((habit) => habit.category !== null)
      .map((habit) => habit.category)
  );

  return (
    <View style={styles.container}>
      {loading && <Text>Loading... (replace this with a spinner)</Text>}
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <HabitElement
            habit={item}
            navigation={navigation}
            onDelete={onUpdate}
          />
        )}
        keyExtractor={(item) => item.id}
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
});
