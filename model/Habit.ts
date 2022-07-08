export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";

export default class Habit {
  id?: string;
  name: string;
  creationDate: Date;
  minTime?: number;
  maxTime?: number;
  benefits: number;
  energy: number;
  userId: string;
  timesOfDay: string[];
  tags?: string[];
  clockInTimes: Date[] = [];
  lastDone: Date;

  // Constructor for Habit from JSON
  static fromJSON(json: any): Habit {
    const habit = new Habit(json.id, json.name);
    habit.creationDate = new Date(json.creationDate);
    habit.minTime = json.minTime;
    habit.maxTime = json.maxTime;
    habit.benefits = json.benefits;
    habit.energy = json.energy;
    habit.userId = json.userId;
    habit.timesOfDay = json.timesOfDay;
    habit.tags = json.tags;
    habit.clockInTimes = json.clockInTimes?.map((time) => new Date(time));
    return habit;
  }

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  clockIn(): void {
    const now: Date = new Date();
    if (!this.clockInTimes) {
      this.clockInTimes = [];
    }

    if (this.clockInTimes.length >= 10) {
    }
    this.clockInTimes.push(now);

    // TODO Following code is for API purposes only, remove when backend is ready
    this.lastDone = now;
  }

  getLastDone(): Date | undefined {
    // Get most recent clock in time if clockInTimes defined and not empty
    if (this.clockInTimes.length > 0) {
      return this.clockInTimes[this.clockInTimes.length - 1];
    }
    return undefined;
  }

  setId(id: string) {
    this.id = id;
  }
}

export class HabitBuilder {
  private readonly _habit: Habit;

  constructor() {
    this._habit = new Habit("", "");
  }

  setName(name: string) {
    this._habit.name = name;
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

  setBenefits(benefits: number) {
    this._habit.benefits = benefits;
    return this;
  }

  setUserId(userId: string) {
    this._habit.userId = userId;
    return this;
  }

  setEnergy(energy: number) {
    this._habit.energy = energy;
    return this;
  }

  setTags(tags: string[]) {
    this._habit.tags = tags;
    return this;
  }

  setCreationDate(creationDate: Date) {
    this._habit.creationDate = creationDate;
    return this;
  }

  setTimesOfDay(timesOfDay: string[]) {
    this._habit.timesOfDay = timesOfDay;
    return this;
  }

  setClockInTimes(clockInTimes: Date[]) {
    this._habit.clockInTimes = clockInTimes;
    return this;
  }

  build(): Habit {
    return this._habit;
  }

  copy(habit: Habit) {
    this._habit.id = habit.id;
    this._habit.name = habit.name;
    this._habit.creationDate = habit.creationDate;
    this._habit.minTime = habit.minTime;
    this._habit.maxTime = habit.maxTime;
    this._habit.energy = habit.energy;
    this._habit.benefits = habit.benefits;
    this._habit.userId = habit.userId;
    this._habit.tags = habit.tags;
    this._habit.timesOfDay = habit.timesOfDay;
    this._habit.clockInTimes = habit.clockInTimes;
    this._habit.lastDone = habit.lastDone;
    return this.build();
  }
}
