import Habit from "../model/Habit";
import { Goal, Suggestion } from "../model/LinetimeTypes";

export function fetchSuggestions(time: number, energy: number, goal: Goal): Promise<Suggestion[]> {
    let targetUrl = `http://localhost:8000/opt?time=${time}&energy=${energy}&goal=${goal}`;
    return fetch(targetUrl)
        .then(response => response.json())
        .then(json => json as Suggestion[])
        .catch(error => {
            console.log(error);
            return [];
        }
        );
}

// TODO Make sure this only runs once, and not every time the page is loaded
export function getUserHabits(): Habit[] {
    // Create a list of mock habits
    let habits: Habit[] = [];
    return habits;
}
