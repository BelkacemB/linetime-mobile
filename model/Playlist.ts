import Habit from "./Habit";
// A playlist is a collection of Habits (order matters). Use the builder pattern to create a Playlist
// object.
export default class Playlist {
  id?: string;
  name: string;
  creationDate: Date;
  habits: string[] = [];
  userId: string;

  // Constructor for Playlist from JSON
  static fromJSON(json: any): Playlist {
    const playlist = new Playlist(json.id, json.name);
    playlist.creationDate = new Date(json.creationDate);
    playlist.habits = json.habits?.map((habit) => Habit.fromJSON(habit));
    playlist.userId = json.userId;
    return playlist;
  }

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addHabit(habitId: string): Playlist {
    this.habits.push(habitId);
    return this;
  }

  removeHabit(habitId: string): Playlist {
    this.habits = this.habits.filter((h) => h !== habitId);
    return this;
  }

  // Returns a new Playlist object with the habits in the same order as the given list of habit IDs
  reorderHabits(habitIds: string[]): Playlist {
    const newPlaylist = new Playlist(this.id, this.name);
    newPlaylist.creationDate = this.creationDate;
    newPlaylist.userId = this.userId;
    newPlaylist.habits = habitIds;
    return newPlaylist;
  }

  // Clear a playlist from all habits (useful for updating a playlist)
  clearHabits(): Playlist {
    this.habits = [];
    return this;
  }
}
