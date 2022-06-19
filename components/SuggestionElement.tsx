import React from "react";
import useUserHabitList from "../hooks/useUserHabitList";
import Habit from "../model/Habit";
import { Suggestion } from "../model/LinetimeTypes";

import { updateHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";
import { Button, ListItem } from "@rneui/base";

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

  const onHabitClick = () => {
    matchingHabit.lastDone = new Date();
    updateHabit(matchingHabit, userToken);
    setHidden(true);
  };

  return (
    <ListItem.Swipeable
      leftContent={(reset) => (
        <Button
          title="Reject"
          onPress={() => {
            reset();
            setHidden(true);
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
        <ListItem.Title>
          {suggestion.name} for {suggestion.suggestedTime} minutes.
        </ListItem.Title>
        <ListItem.Subtitle>
          {hidden ? "Done" : "Active suggestion"}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
