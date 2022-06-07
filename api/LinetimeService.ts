import { Platform } from "react-native";
import { Suggestion } from "../model/LinetimeTypes";

const IP_ADDRESS = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const PORT = 8000;

const API_URL = `http://${IP_ADDRESS}:${PORT}/opt`;

export type SuggestionRequest = {
  time: number;
  energy: number;
  userId: string;
  tags?: string[];
  localTime?: string;
};

export function fetchSuggestions(
  suggestionRequest: SuggestionRequest
): Promise<Suggestion[]> {
  const tagsStr = suggestionRequest.tags
    ? suggestionRequest.tags.join(",")
    : "";
  let targetUrl = `${API_URL}?time=${suggestionRequest.time}&energy=${
    suggestionRequest.energy
  }&user-id=${suggestionRequest.userId}&tags=${tagsStr}&local-time=${
    suggestionRequest.localTime ? suggestionRequest.localTime : ""
  }`;
  console.log(targetUrl);
  return fetch(targetUrl)
    .then((response) => response.json())
    .then((json) => json as Suggestion[])
    .catch((error) => {
      console.log(error);
      return [];
    });
}
