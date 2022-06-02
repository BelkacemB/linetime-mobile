import { useState, useEffect } from "react";
import { getUserHabits } from "../api/HabitService";
import Habit from "../model/Habit";

export default function useHabitList(userId: string) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getUserHabits(userId).then((habits) => {
      setLoading(false);
      setHabits(habits);
    });
  }, [update]);

  const onUpdate = () => {
    setUpdate(!update);
  };

  return [habits, loading, onUpdate] as const;
}
