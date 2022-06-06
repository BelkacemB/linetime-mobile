import { Platform } from "react-native";
import Habit from "../model/Habit";

const IP_ADDRESS = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const PORT = 8000;

const API_URL = `http://${IP_ADDRESS}:${PORT}/habits`;

export function persistHabit(habit: Habit) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  }).catch((error) => {
    console.log(error);
  });
}

// Update the habit with an UPDATE request
export function updateHabit(habit: Habit) {
  fetch(`${API_URL}/${habit.userId}/${habit.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habit),
  }).catch((error) => {
    console.log(error);
  });
}

export function deleteHabit(habit: Habit) {
  fetch(`${API_URL}/${habit.userId}/${habit.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
}

export async function getUserHabits(userId: string): Promise<Habit[]> {
  return fetch(`${API_URL}/${userId}`)
    .then((response) => response.json())
    .then((json) => json as Habit[])
    .catch((error) => {
      console.log(error);
      return [];
    });
}
