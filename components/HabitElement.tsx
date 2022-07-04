import React from "react";
import Habit from "../model/Habit";
import { deleteHabit, updateHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";
import { AirbnbRating, Button, ListItem } from "@rneui/base";
import { Text, View } from "./Themed";

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("fr-FR");
};

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
      leftWidth={220}
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
            title="Clock in"
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <ListItem.Title style={{ fontSize: 20, fontWeight: "500" }}>
              {habit.name}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14, fontStyle: "italic"}}>
              Last done: {formatDate(habit.lastDone)}
            </ListItem.Subtitle>
          </View>
          <View>
            <AirbnbRating
              count={3}
              defaultRating={habit.benefits}
              size={15}
              showRating={false}
            />
            <Text style={{ fontStyle: "italic", fontSize: 13 }}>
              {habit.tags?.map((tag) => tag.toLowerCase()).join(", ")}
            </Text>
          </View>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
