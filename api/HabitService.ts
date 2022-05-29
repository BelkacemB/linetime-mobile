import { habitsRef } from "../firebase";
import { push, onValue } from "firebase/database";
import Habit from "../model/Habit";

export const persistHabit = (habit: Habit) => {
    console.log(`Adding habit to database: ${habit.name}`);
    push(habitsRef, habit);
}

export class HabitService {
    static getHabits() {
        const habits: Array<Habit> = [];
        onValue(habitsRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                const habit = childSnapshot.val() as Habit;
                habit.id = childSnapshot.key;
                habits.push(habit);
            });
        });
        return habits;
    }
}