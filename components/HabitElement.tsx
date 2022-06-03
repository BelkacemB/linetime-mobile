import React from "react";
import Habit from "../model/Habit";
import { Text, View, TouchableOpacity } from "./Themed";
import { deleteHabit } from "../api/HabitService";

type HabitProps = {
  habit: Habit;
  // Provide type for navigation prop
  navigation: any;
  onUpdateOrDelete: () => void;
};

export const HabitElement = ({
  habit,
  navigation,
  onUpdateOrDelete,
}: HabitProps) => {
  const edit = () => {
    navigation.navigate("EditHabit", {
      habit: habit,
      onUpdate: onUpdateOrDelete,
    });
  };

  function remove() {
    deleteHabit(habit);
    onUpdateOrDelete();
  }

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        padding: 5,
      }}
    >
      <Text style={{ fontSize: 20 }}>{habit.name}</Text>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          borderWidth: 1,
          padding: 10,
          marginLeft: 20,
        }}
        onPress={edit}
      >
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ borderRadius: 50, borderWidth: 1, padding: 10 }}
        onPress={remove}
      >
        <Text>❌</Text>
      </TouchableOpacity>
    </View>
  );
};
