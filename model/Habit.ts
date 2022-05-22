export default class Habit {
    
    id: number;
    name: string;
    lastDone: Date | undefined;

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