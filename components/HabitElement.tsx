import React from "react";
import Habit from "../model/Habit";
import { deleteHabit, updateHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";
import { Button, ListItem } from "@rneui/base";

type HabitProps = {
  habit: Habit;
  navigation: any;
  onUpdateOrDelete: () => void;
};

export const HabitElement = ({
  habit,
  navigation,
  onUpdateOrDelete,
}: HabitProps) => {
  const userToken = useUserToken();

  const edit = () => {
    navigation.navigate("AddEditHabit", {
      habit: habit,
      onUpdate: onUpdateOrDelete,
    });
  };

  function remove() {
    deleteHabit(habit, userToken);
    onUpdateOrDelete();
  }
  const onHabitCheck = () => {
    habit.lastDone = new Date();
    updateHabit(habit, userToken);
    onUpdateOrDelete();
  };

  return (
    <ListItem.Swipeable
      leftWidth={250}
      leftStyle={{ flexDirection: "row" }}
      leftContent={(reset) => (
        <>
          <Button
            title="Edit"
            onPress={() => {
              reset();
              edit();
            }}
            icon={{ name: "settings", color: "white" }}
            buttonStyle={{ minHeight: "100%" }}
          />
          <Button
            title="Check in"
            onPress={() => {
              reset();
              onHabitCheck();
            }}
            icon={{ name: "check", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "green" }}
          />
        </>
      )}
      rightContent={(reset) => (
        <Button
          title="Delete"
          onPress={() => {
            reset();
            remove();
          }}
          icon={{ name: "delete", color: "white" }}
          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
        />
      )}
    >
      <ListItem.Content>
        <ListItem.Title>{habit.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
