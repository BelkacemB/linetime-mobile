import Habit from './Habit';
// A playlist is a collection of Habits (order matters). Use the builder pattern to create a Playlist
// object.
export default class Playlist {
    id?: string;
    name: string;
    creationDate: Date;
    habits: Habit[] = [];
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

    addHabit(habit: Habit): Playlist {
        this.habits.push(habit);
        return this;
    }

    removeHabit(habit: Habit): Playlist {
        this.habits = this.habits.filter((h) => h.id !== habit.id);
        return this;
    }

    // Returns a new Playlist object with the habits in the same order as the given list of habit IDs
    reorderHabits(habitIds: string[]): Playlist {
        const newPlaylist = new Playlist(this.id, this.name);
        newPlaylist.creationDate = this.creationDate;
        newPlaylist.userId = this.userId;
        newPlaylist.habits = habitIds.map((id) => this.habits.find((h) => h.id === id));
        return newPlaylist;
    }
    }
