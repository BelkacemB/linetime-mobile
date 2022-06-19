import { Suggestion } from "../model/LinetimeTypes";
import { IP_ADDRESS, PORT } from "./constants";

const API_URL = `http://${IP_ADDRESS}:${PORT}/opt`;
export type SuggestionRequest = {
  time: number;
  energy: number;
  tags?: string[];
  localTime?: string;
  token: string;
};

export function fetchSuggestions(
  suggestionRequest: SuggestionRequest
): Promise<Suggestion[]> {
  const tagsStr = suggestionRequest.tags
    ? suggestionRequest.tags.join(",")
    : "";
  let targetUrl = `${API_URL}?time=${suggestionRequest.time}&energy=${
    suggestionRequest.energy
  }&tags=${tagsStr}&local-time=${
    suggestionRequest.localTime ? suggestionRequest.localTime : ""
  }`;
  console.log(targetUrl);
  return fetch(targetUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${suggestionRequest.token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => json as Suggestion[])
    .catch((error) => {
      console.log(error);
      return [];
    });
}
