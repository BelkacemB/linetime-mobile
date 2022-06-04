export default class Habit {
  id?: string;
  name: string;
  creationDate: Date;
  lastDone?: Date;
  lastRejected?: Date;
  minTime?: number;
  maxTime?: number;
  fun: number;
  benefits: number;
  energy: number;
  userId: string;
  tags?: string[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  updateLastDone(lastDone: Date) {
    this.lastDone = lastDone;
  }

  getLastDone(): Date | undefined {
    return this.lastDone;
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

  build(): Habit {
    return this._habit;
  }

  // Copy existing habit
  copy(habit: Habit) {
    this._habit.id = habit.id;
    this._habit.name = habit.name;
    this._habit.lastDone = habit.lastDone;
    this._habit.creationDate = habit.creationDate;
    this._habit.minTime = habit.minTime;
    this._habit.maxTime = habit.maxTime;
    this._habit.energy = habit.energy;
    this._habit.fun = habit.fun;
    this._habit.benefits = habit.benefits;
    this._habit.userId = habit.userId;
    this._habit.tags = habit.tags;
    return this.build();
  }
}
