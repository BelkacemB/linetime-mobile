import Playlist from "../model/Playlist";
import { API_ADDRESS } from "./constants";

const API_URL = `${API_ADDRESS}/playlists`;

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
