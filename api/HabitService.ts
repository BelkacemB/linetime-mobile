import { db } from "../firebase";
import { ref, push } from "firebase/database";
import Habit from "../model/Habit";

export async function persistHabit(habit: Habit, uid: string) {
  const { id, ...data } = habit;
  await push(ref(db, `habits/${uid}`), data);
}

export const getUserDBRef = (uid: string) => ref(db, `habits/${uid}`);
