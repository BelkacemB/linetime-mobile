import React from "react";
import { transparentSecondaryColor } from "../constants/Colors";
import useUserHabitList from "../hooks/useUserHabitList";
import Habit from "../model/Habit";
import { Suggestion } from "../model/LinetimeTypes";

import { updateHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";

import { View, Text } from "./Themed";
import { TouchableOpacity } from "./Themed";

type Props = {
  suggestion: Suggestion;
};

export const SuggestionElement = ({ suggestion }: Props) => {
  const [habits] = useUserHabitList();
  const [hidden, setHidden] = React.useState(false);
  const userToken = useUserToken();

  const matchingHabit: Habit = habits.find(
    (habit) => habit.id === suggestion.id
  );

  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        padding: 5,
        borderBottomWidth: 1,
        opacity: hidden ? 0.2 : 1,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {suggestion.name}
      </Text>
      <Text> for </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {suggestion.suggestedTime}
      </Text>
      <Text> minutes 🕒 </Text>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: transparentSecondaryColor,
          padding: 10,
          marginLeft: 20,
        }}
        onPress={() => {
          matchingHabit.lastDone = new Date();
          updateHabit(matchingHabit, userToken);
          setHidden(true);
        }}
      >
        <Text>✅</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: transparentSecondaryColor,
          padding: 10,
        }}
      >
        <Text>❌</Text>
      </TouchableOpacity>
    </View>
  );
};
