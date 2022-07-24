import React from "react";
import Habit from "../model/Habit";
import { View, Text } from "./Themed";

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

  return (
    <View>
      {/* TODO Use a proper flatlist here? */}
      {habits && habits.length == 1 && (
        <Text>Logs for habit "{habits[0].name}"</Text>
      )}
      {sortedCheckIns.map((checkIn) => {
        return (
          <View
            key={checkIn.checkInTime.getTime()}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{checkIn.checkInTime.toLocaleString()}</Text>
            <Text>{checkIn.note}</Text>
          </View>
        );
      })}
    </View>
  );
};
