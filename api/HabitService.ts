import Habit from "../model/Habit";

const API_URL = "http://localhost:8001/habits";

export function persistHabit(habit: Habit) {
  // Send a POST request to the server with the habit as JSON
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

export function deleteHabit(habit: Habit) {
  // Send a DELETE request to the server with the habit as JSON
  console.log(`${API_URL}/${habit.userId}/${habit.id}`)
  
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
  // Send a GET request to the server with the userId as URL parameter
  return fetch(`${API_URL}/${userId}`)
    .then((response) => response.json())
    .then((json) => json as Habit[])
    .catch((error) => {
      console.log(error);
      return [];
    });
}
