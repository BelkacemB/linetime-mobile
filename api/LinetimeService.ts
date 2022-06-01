import { Suggestion } from "../model/LinetimeTypes";

const API_URL = "http://localhost:8001/opt";

export function fetchSuggestions(
  time: number,
  energy: number,
  userId: string
): Promise<Suggestion[]> {
  let targetUrl = `${API_URL}?time=${time}&energy=${energy}&user-id=${userId}`;
  return fetch(targetUrl)
    .then((response) => response.json())
    .then((json) => json as Suggestion[])
    .catch((error) => {
      console.log(error);
      return [];
    });
}
