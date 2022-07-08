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
  console.log(habit.name)
  console.log(habit.clockInTimes);
  const checkInDiffs = habit.clockInTimes.map((checkIn, index) => {
    if (index === 0) {
      return 0;
    }
    const prevCheckIn = habit.clockInTimes[index - 1];
    return (checkIn.getTime() - prevCheckIn.getTime()) / 60000;
  });

  const averageCheckInDiff =
    checkInDiffs.reduce((acc, curr) => acc + curr, 0) / checkInDiffs.length;
  return averageCheckInDiff;
};

const getFrequencyFromCheckInDiff = (checkInDiff: number): string => {
  if (checkInDiff < 60 * 24) {
    return "daily";
  } else {
    const averageCheckInDiff = checkInDiff / (60 * 24);
    return `${Math.round(averageCheckInDiff)} days`;
  }
};

export const getCheckInFrequencyFromHabit = (habit: Habit): string => {
  return getFrequencyFromCheckInDiff(calculateHabitCheckInFrequncy(habit));
};
