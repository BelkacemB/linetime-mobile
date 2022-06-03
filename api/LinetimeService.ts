import { Platform } from "react-native";
import { Suggestion } from "../model/LinetimeTypes";

const IP_ADDRESS = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const PORT = 8002;

const API_URL = `http://${IP_ADDRESS}:${PORT}/opt`;

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
