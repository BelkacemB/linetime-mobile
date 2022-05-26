import { Suggestion } from "../model/Suggestion";

export function fetchSuggestions(time: number, energy: number): Promise<Suggestion[]> {
    let targetUrl = `http://localhost:8000/opt?time=${time}&energy=${energy}`;
    return fetch(targetUrl)
        .then(response => response.json())
        .then(json => json as Suggestion[])
        .catch(error => {
            console.log(error);
            return [];
        }
        );
}
