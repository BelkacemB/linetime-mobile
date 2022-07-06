import React from "react";
import Habit from "../model/Habit";
import { deleteHabit, updateHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";
import { AirbnbRating, Button, ListItem, Dialog } from "@rneui/base";
import { Text, TouchableOpacity, View } from "./Themed";
import { secondaryColor } from "../constants/Colors";

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

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const edit = () => {
    navigation.navigate("AddEditHabit", {
      habit: habit,
      onUpdate: onUpdateOrDelete,
    });
  };

  const confirmDelete = () => {
    setIsDialogVisible(true);
  };

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  function remove() {
    toggleDialog();
    deleteHabit(habit, userToken);
    onUpdateOrDelete();
  }
  const onHabitCheck = () => {
    habit.clockIn();
    updateHabit(habit, userToken);
    onUpdateOrDelete();
  };

  return (
    <>
      <Dialog
        isVisible={isDialogVisible}
        onBackdropPress={toggleDialog}
        overlayStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title title="Delete habit" />
        <Text>Are you sure you want to delete the habit "{habit.name}"?</Text>
        <Dialog.Actions>
          <Dialog.Button title="Yes" onPress={remove} />
          <Dialog.Button title="No" onPress={toggleDialog} />
        </Dialog.Actions>
      </Dialog>
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
              confirmDelete();
            }}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ backgroundColor: "red", minHeight: "100%" }}
          />
        )}
      >
        <ListItem.Content
          onPress={() => {
            edit();
          }}
          style={{ borderBottomColor: secondaryColor, borderBottomWidth: 1 }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: 1,
              paddingBottom: 5,
            }}
            onLongPress={() => {
              edit();
            }}
          >
            <View>
              <ListItem.Title style={{ fontSize: 20, fontWeight: "500" }}>
                {habit.name}
              </ListItem.Title>
              <ListItem.Subtitle style={{ fontSize: 14, fontStyle: "italic" }}>
                Last done:{" "}
                {habit.clockInTimes?.length > 0
                  ? formatDate(habit.clockInTimes[0])
                  : "Never"}
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
          </TouchableOpacity>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </>
  );
};
