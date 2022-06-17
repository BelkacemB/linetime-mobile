import { Platform } from "react-native";
import { Suggestion } from "../model/LinetimeTypes";

const IP_ADDRESS = "192.168.1.44" // = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const PORT = 8080;

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
