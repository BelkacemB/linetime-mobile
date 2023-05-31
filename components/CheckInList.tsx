import React from "react";
import Habit from "../model/Habit";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";

type Props = {
  habits: Habit[];
};

type CheckInLineType = {
  checkInTime: Date;
  note: string;
  habitName: string;
};

export const CheckInList = ({ habits }: Props) => {
  // Get all the clockIntimes for the habits and enrich them with the habit name
  const checkIns: CheckInLineType[] = habits
    .map((habit) => {
      const checkIns = habit.clockInTimes;
      return checkIns.map((checkIn) => {
        return {
          ...checkIn,
          habitName: habit.name,
        };
      });
    })
    .flat();

  // Sort the checkIns by date from newest to oldest
  const sortedCheckIns = checkIns.sort((a, b) => {
    return b.checkInTime.getTime() - a.checkInTime.getTime();
  });

  // Function that the date to "N days ago" or "N hours ago" if it's less than 24 hours
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffInHours = diff / (1000 * 60 * 60);
    if (diffInHours < 24) {
      return `${Math.round(diffInHours)} hours ago`;
    } else {
      return `${Math.round(diffInHours / 24)} days ago`;
    }
  };

  return (
    <View>
      {sortedCheckIns.map((checkIn) => {
        return (
          <View
            key={checkIn.checkInTime.getTime()}
            style={styles.checkInElement}
          >
            <Text style={{ fontWeight: "bold" }}>
              {formatDate(checkIn.checkInTime)}
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                width: "50%",
              }}
            >
              {checkIn.note}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  checkInElement: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 5,
    marginVertical: 5,
  },
});
