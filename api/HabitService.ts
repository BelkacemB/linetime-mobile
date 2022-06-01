import { db } from "../firebase";
import { ref, push, remove } from "firebase/database";
import Habit from "../model/Habit";

export async function persistHabit(habit: Habit, uid: string) {
  const { id, ...data } = habit;
  await push(ref(db, `habits/${uid}`), data);
}

export async function deleteHabit(habitId: string, userId: string) {
  const habitDbPath = `habits/${userId}/${habitId}`;
  console.log(habitDbPath);

  remove(ref(db, habitDbPath))
    .catch((error) => {
      console.log(error);
    });
}

export const getUserDBRef = (uid: string) => ref(db, `habits/${uid}`);
