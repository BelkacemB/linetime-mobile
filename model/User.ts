import Habit from "./Habit";

class User {

    habits: Habit[] = [];

    constructor(
        public id: number,
        public name: string,
        public email: string
    ) {}

    getHabits(): Habit[] {
        return this.habits;
    }
    
}