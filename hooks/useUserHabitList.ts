import { useState, useEffect } from "react";
import { getUserHabits } from "../api/HabitService";
import Habit from "../model/Habit";
import useUserId from "./useUserId";
import useUserToken from "./useUserToken";

// TODO This hook can be improved. The useEffect is dubious

export default function useUserHabitList() {
  const userId = useUserId();
  const userToken = useUserToken();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (userId && userToken) {
      getUserHabits(userId, userToken).then((habits) => {
        setLoading(false);
        setHabits(habits);
      });
    }
  }, [update, userToken]);

  const onUpdate = () => {
    setUpdate(!update);
  };

  return [habits, loading, onUpdate] as const;
}
