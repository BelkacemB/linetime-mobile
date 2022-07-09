import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import Habit from "../model/Habit";
import { AirbnbRating, Button, ListItem, Dialog } from "@rneui/base";
import { Text, TouchableOpacity, View } from "./Themed";
import { secondaryColor } from "../constants/Colors";
import { getCheckInFrequencyFromHabit } from "../model/Util";
import { Feather } from "@expo/vector-icons";
import { AppContext } from "../model/Store";

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("fr-FR");
};

type HabitProps = {
  habit: Habit;
  navigation: any;
};

export const HabitElement = ({ habit, navigation }: HabitProps) => {
  const { dispatch } = useContext(AppContext);

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const edit = () => {
    navigation.navigate("AddEditHabit", {
      habit: habit,
    });
  };

  const askForDeleteConfirmation = () => {
    setIsDialogVisible(true);
  };

  const toggleDialog = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  function remove() {
    dispatch({ type: "DELETE_HABIT", habit });
  }

  const onHabitCheck = () => {
    habit.clockIn();
    dispatch({ type: "UPDATE_HABIT", habit });
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
        leftStyle={{ flexDirection: "row", alignItems: "center" }}
        leftContent={(reset) => (
          <>
            <Button
              title="Edit"
              onPress={() => {
                reset();
                edit();
              }}
              icon={{ name: "settings", color: "white" }}
              buttonStyle={{ minHeight: "80%" }}
            />
            <Button
              title="Check in"
              onPress={() => {
                reset();
                onHabitCheck();
              }}
              icon={{ name: "check", color: "white" }}
              buttonStyle={{ minHeight: "80%", backgroundColor: "green" }}
            />
          </>
        )}
        rightStyle={{ flexDirection: "row", alignItems: "center" }}
        rightContent={(reset) => (
          <Button
            title="Delete"
            onPress={() => {
              reset();
              askForDeleteConfirmation();
            }}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ backgroundColor: "red", minHeight: "80%" }}
          />
        )}
      >
        <ListItem.Content
          onPress={() => {
            edit();
          }}
          style={styles.habitElement}
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
                Last check-in:{" "}
                {habit.clockInTimes?.length > 0
                  ? formatDate(
                      habit.clockInTimes[habit.clockInTimes.length - 1]
                    )
                  : "Never"}
              </ListItem.Subtitle>
              {habit.clockInTimes?.length >= 2 && (
                <Text style={{ fontSize: 13, marginTop: 5 }}>
                  <Feather name="repeat" size={13} color="black" />{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {getCheckInFrequencyFromHabit(habit)}
                  </Text>
                </Text>
              )}
            </View>
            <View style={{ alignItems: "center" }}>
              <AirbnbRating
                count={3}
                defaultRating={habit.benefits}
                size={15}
                isDisabled
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

const styles = StyleSheet.create({
  habitElement: {
    minHeight: 60,
    shadowColor: secondaryColor,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 6 },
  },
});
