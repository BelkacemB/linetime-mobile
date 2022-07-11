import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import Habit from "../model/Habit";
import { AirbnbRating, Dialog } from "@rneui/base";
import { Text, TouchableOpacity, View } from "./Themed";
import { secondaryColor } from "../constants/Colors";
import {
  getCheckInFrequencyFromHabit,
  getHoursOrDaysFromLastCheckIn,
} from "../model/Util";
import { Entypo, Feather } from "@expo/vector-icons";
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

  const edit = () => {
    navigation.navigate("AddEditHabit", {
      habit: habit,
    });
  };

  function remove() {
    dispatch({ type: "DELETE_HABIT", habit });
  }

  return (
    <>
      <View style={styles.habitElement}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 1,
            paddingBottom: 5,
            alignItems: "center",
          }}
          onPress={() => {
            edit();
          }}
        >
          <Entypo name="chevron-small-left" size={24} color={secondaryColor} />
          <View style={{ width: "35%" }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              {habit.name}
            </Text>
            <Text style={{ fontSize: 14, fontStyle: "italic" }}>
              Last check-in: {getHoursOrDaysFromLastCheckIn(habit)}
            </Text>
            {habit.clockInTimes?.length >= 2 && (
              <Text style={{ fontSize: 13, marginTop: 5 }}>
                <Feather name="repeat" size={13} color="black" />{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {getCheckInFrequencyFromHabit(habit)}
                </Text>
              </Text>
            )}
          </View>
          <View
            style={{ alignItems: "center", width: "15%", flexWrap: "wrap" }}
          >
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
          <Entypo name="chevron-small-right" size={24} color={secondaryColor} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  habitElement: {
    width: "100%",
    minHeight: 60,
    padding: 10,
    marginBottom: 2,
    shadowColor: secondaryColor,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 6 },
  },
});
