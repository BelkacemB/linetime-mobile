import { habitsRef } from "../firebase";
import { push, onValue } from "firebase/database";
import Habit from "../model/Habit";

export const persistHabit = (habit: Habit) => {
    console.log(`Adding habit to database: ${habit.name}`);
    push(habitsRef, habit);
}

export const onHabitListChanged = (callback: (habits: Habit[]) => void) => {
    onValue(habitsRef, (snapshot: any) => {
        const habits: Habit[] = [];
        snapshot.forEach((childSnapshot: any) => {
            const habit = childSnapshot.val();
            habits.push(habit);
        });
        callback(habits);
    })
}
