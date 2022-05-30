import { habitsRef } from "../firebase";
import { push, onValue, DataSnapshot } from "firebase/database";
import Habit from "../model/Habit";

export const persistHabit = (habit: Habit) => {
    const {id, ...data} = habit;
    push(habitsRef, data);
}

export const onHabitListChanged = (callback: (habits: Habit[]) => void) => {
    onValue(habitsRef, (snapshot: DataSnapshot) => {
        const habits: Habit[] = [];
        snapshot.forEach((childSnapshot: DataSnapshot) => {
            let habit = {...childSnapshot.val(), id: childSnapshot.key};
            habits.push(habit);
        });
        callback(habits);
    })
}
