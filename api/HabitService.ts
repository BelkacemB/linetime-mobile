import { habitsRef } from "../firebase";
import { push, onValue, DataSnapshot } from "firebase/database";
import Habit from "../model/Habit";

export const persistHabit = (habit: Habit) => {
  const { id, ...data } = habit;
  push(habitsRef, data);
};
