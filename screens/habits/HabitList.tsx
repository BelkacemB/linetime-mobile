import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { HabitElement } from "../../components/HabitElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import { getUserHabits } from "../../api/HabitService";

export const HabitList = ({ navigation }) => {
  const [user] = useAuthState(auth);
  const [habits, setHabits] = useState([]);

  // Create a boolean state to track whether the data has been updated or not
  // TODO Better solution: build a custom hook to handle this

  useEffect(() => {
    getUserHabits(user.uid).then((habits) => {
      setHabits(habits);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <HabitElement habit={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* Add a new habit */}
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddHabit");
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
