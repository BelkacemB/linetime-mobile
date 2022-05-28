import { Goal } from "../model/LinetimeTypes";
import { Suggestion } from "../model/Suggestion";

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
