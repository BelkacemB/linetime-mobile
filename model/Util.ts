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

export const habitTagsReducer = (state, action) => {
  // TODO Complete later
};
