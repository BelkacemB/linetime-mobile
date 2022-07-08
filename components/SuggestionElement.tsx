import React, { useContext } from "react";
import Habit from "../model/Habit";
import { Suggestion } from "../model/LinetimeTypes";

import { updateHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";
import { Button, ListItem } from "@rneui/base";
import { Text } from "./Themed";
import { View } from "react-native";
import Feather from "@expo/vector-icons/build/Feather";
import { secondaryColor, tertiaryColor } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { AppContext } from "../model/Store";

type Props = {
  suggestion: Suggestion;
};

export const SuggestionElement = ({ suggestion }: Props) => {
  const {
    state: { habits },
  } = useContext(AppContext);

  const { dispatch } = useContext(AppContext);

  const matchingHabit: Habit = habits.find(
    (habit) => habit.id === suggestion.id
  );

  const onHabitClick = () => {
    matchingHabit.clockIn();
    dispatch({ type: "UPDATE_HABIT", habit: matchingHabit });
  };

  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Reject"
          onPress={() => {
            reset();
          }}
          icon={{ name: "close", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
      rightContent={(reset) => (
        <Button
          title="Accept"
          onPress={() => {
            reset();
            onHabitClick();
          }}
          icon={{ name: "check", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "green" }}
        />
      )}
    >
      <ListItem.Content>
        <LinearGradient
          colors={[tertiaryColor, secondaryColor, tertiaryColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: "100%" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 1,
              paddingBottom: 10,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "50%",
                justifyContent: "center",
              }}
            >
              <Feather name="activity" size={24} color="black" />
              <Text style={{ fontSize: 20 }}> {suggestion.name}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Text style={{ fontSize: 20 }}>
                {" "}
                {suggestion.suggestedTime} minutes
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
