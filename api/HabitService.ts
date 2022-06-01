import { db } from "../firebase";
import { ref, push, remove } from "firebase/database";
import Habit from "../model/Habit";

export async function persistHabit(habit: Habit) {
  const { id, ...data } = habit;
  await push(ref(db, `habits/${habit.userId}`), data);
}

export async function deleteHabit(habit: Habit) {
  const habitDbPath = `habits/${habit.userId}/${habit.id}`;

  remove(ref(db, habitDbPath))
    .catch((error) => {
      console.log(error);
    });
}

export const getUserDBRef = (uid: string) => ref(db, `habits/${uid}`);
