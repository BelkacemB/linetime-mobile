export default class Habit {
    
    id: number;
    name: string;
    lastDone?: Date;
    minTime?: number;
    maxTime?: number;
    fun: number;
    benefits: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    updateLastDone(lastDone: Date) {
        this.lastDone = lastDone;
    }

    getLastDone(): Date | undefined {
        return this.lastDone;
    }

}

export class HabitBuilder {

    private readonly _habit: Habit;

    constructor() {
        this._habit = new Habit(0, "");
    }

    setId(id: number) {
        this._habit.id = id;
        return this;
    }

    setName(name: string) {
        this._habit.name = name;
        return this;
    }

    setLastDone(lastDone: Date) {
        this._habit.lastDone = lastDone;
        return this;
    }

    setMinTime(minTime: number) {
        this._habit.minTime = minTime;
        return this;
    }

    setMaxTime(maxTime: number) {
        this._habit.maxTime = maxTime;
        return this;
    }

    setFun(fun: number) {
        this._habit.fun = fun;
        return this;
    }

    setBenefits(benefits: number) {
        this._habit.benefits = benefits;
        return this;
    }

    build(): Habit {
        return this._habit;
    }

}