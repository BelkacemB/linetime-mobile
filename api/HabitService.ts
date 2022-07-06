import Habit from "../model/Habit";
import { API_ADDRESS } from "./constants";

const API_URL = `${API_ADDRESS}/habits`;

export function persistHabit(habit: Habit, token: string) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(habit),
  }).catch((error) => {
    console.log(error);
  });
}

// Update the habit with an UPDATE request
export function updateHabit(habit: Habit, token: string) {
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

export function deleteHabit(habit: Habit, token: string) {
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
  return fetch(`${API_URL}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => json.map((habit) => Habit.fromJSON(habit)))
    .catch((error) => {
      console.log(error);
      return [];
    });
}
