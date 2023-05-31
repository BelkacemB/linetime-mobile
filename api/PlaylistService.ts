import Playlist from "../model/Playlist";
import Constants from "expo-constants";

const API_URL = `${Constants.manifest.extra.apiUrl}/playlists`;

export async function persistPlaylist(
  playlist: Playlist,
  token: string
): Promise<string> {
  // Post the playlist to the API and return the id from the "id" field of the json response
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(playlist),
  });
  const json = await response.json();
  return json.id;
}

export async function getUserPlaylists(
  userId: string,
  token: string
): Promise<Playlist[]> {
  let response = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let json = await response.json();
  return json;
}

export async function deletePlaylist(
  playlist: Playlist,
  token: string,
  userId: string
) {
  fetch(`${API_URL}/${userId}/${playlist.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.log(error);
  });
}

export async function updatePlaylist(
  playlist: Playlist,
  token: string,
  userId: string
) {
  fetch(`${API_URL}/${userId}/${playlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(playlist),
  }).catch((error) => {
    console.log(error);
  });
}
