import Habit from "../model/Habit";
import Constants from "expo-constants";

const API_ADDRESS = Constants.manifest.extra.apiUrl;

const API_URL = `${API_ADDRESS}/habits`;

export async function persistHabit(
  habit: Habit,
  token: string
): Promise<string> {
  // Post the habit to the API and return the id from the "id" field of the json response
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(habit),
  });
  const json = await response.json();
  return json.id;
}

// Update the habit with an UPDATE request
export async function updateHabit(habit: Habit, token: string) {
  fetch(`${API_URL}/${habit.userId}/${habit.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(habit),
  }).catch((error) => {
    console.log(error);
  });
}

export async function deleteHabit(habit: Habit, token: string) {
  fetch(`${API_URL}/${habit.userId}/${habit.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.log(error);
  });
}

export async function getUserHabits(
  userId: string,
  token: string
): Promise<Habit[]> {
  let response = await fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let json = await response.json();
  let habitCollection: any[] = json;
  // Apply habit.fromJson to each habit in the json response
  return habitCollection.map((habitJson) => Habit.fromJSON(habitJson));
}
