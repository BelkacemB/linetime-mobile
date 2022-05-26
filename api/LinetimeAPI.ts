import { Suggestion } from "../model/Suggestion";

export function fetchSuggestions(time: number, energy: number): Suggestion[] {
    let result: Suggestion[] = [];
    let targetUrl = `http://localhost:8000/opt?time=${time}&energy=${energy}`;

    fetch(targetUrl)
        .then(response => response.json())
        .then(json => {
            json.map(s => {
                let suggestion: Suggestion = {
                    activity: s["Activity"],
                    time: s["suggested_time"]
                }
                result.push(suggestion);
            });
        })
        .catch(error => console.log(error));

    console.log(result);
    return result;

}