import { getUserHabits } from "../api/HabitService";
import Habit from "./Habit";

export const extractTagsFromHabits = (habits: Habit[]): string[] => {
  const resultSet = new Set(
    habits
      .filter((habit) => habit.tags !== undefined)
      .map((habit) => habit.tags)
      .flat()
  );
  return Array.from(resultSet);
};

const calculateHabitCheckInFrequncy = (habit: Habit): number => {
  // calculate the average check in diff in minutes between adjacent check ins
  const clockInTimesPlusNow = habit.clockInTimes.concat(new Date());
  const checkInDiffs = clockInTimesPlusNow
    .map((checkIn, index) => {
      if (index === 0) {
        return 0;
      }
      const prevCheckIn = habit.clockInTimes[index - 1];
      return (checkIn.getTime() - prevCheckIn.getTime()) / 60000;
    })
    .filter((checkInDiff) => checkInDiff > 0);
  const averageCheckInDiff =
    checkInDiffs.reduce((acc, curr) => acc + curr, 0) / checkInDiffs.length;
  return averageCheckInDiff;
};

const getFrequencyFromCheckInDiff = (checkInDiff: number): string => {
  if (checkInDiff < 60 * 48) {
    return "daily";
  } else {
    const averageCheckInDiff = checkInDiff / (60 * 24);
    return `every ${Math.round(averageCheckInDiff)} days`;
  }
};

export const getCheckInFrequencyFromHabit = (habit: Habit): string => {
  return getFrequencyFromCheckInDiff(calculateHabitCheckInFrequncy(habit));
};

export async function reloadAndDispatch(
  userId: string,
  token: string,
  dispatch: any
) {
  const habits = await getUserHabits(userId, token);
  dispatch({ type: "LOAD_HABITS", habits });
}

const femaleUserIds = [
  "jDkJCZY2qNNjGRAzhhPwzFoZs5v2",
  "SmJbMEIFtVgQZo22MrNj7lez4Hn2",
  "Rl3jOgppdhSY7OCYOr0UCDxyd6B2",
];

export const isFemaleUser = (userId: string): boolean => {
  return femaleUserIds.includes(userId);
};

export const getHoursOrDaysFromLastCheckIn = (habit: Habit): string => {
  // if clock ins undefined, return "never"
  if (habit.clockInTimes === undefined) {
    return "never";
  }

  if (habit.clockInTimes.length <= 0) {
    return "never";
  }

  const latestCheckIn = habit.clockInTimes[habit.clockInTimes.length - 1];
  const now = new Date();
  const diff = now.getTime() - latestCheckIn.getTime();
  const diffInHours = diff / (1000 * 60 * 60);
  const diffInDays = diff / (1000 * 60 * 60 * 24);
  if (diffInHours < 24) {
    return `${Math.round(diffInHours)} hours`;
  }
  return `${Math.round(diffInDays)} days`;
};
