import React, { useReducer, Dispatch, useEffect } from "react";
import Habit from "./Habit";
import {
  persistHabit,
  updateHabit,
  deleteHabit,
  getUserHabits,
} from "../api/HabitService";

type HabitAction =
  | { type: "ADD_HABIT"; habit: Habit }
  | { type: "UPDATE_HABIT"; habit: Habit }
  | { type: "DELETE_HABIT"; habit: Habit }
  | { type: "LOAD_HABITS"; habits: Habit[] }
  | { type: "SET_TOKEN"; token: string }
  | { type: "SET_USER_ID"; userId: string };

type InitialStateType = {
  habits: Habit[];
  token: string;
  userId: string;
};

const initialState = {
  habits: [] as Habit[],
  token: "",
  userId: "",
};

const AppContext = React.createContext<{
  state: InitialStateType;
  dispatch: Dispatch<HabitAction>;
}>({ state: initialState, dispatch: () => null });

const mainReducer = (
  state: InitialStateType,
  action: HabitAction
): InitialStateType => {
  switch (action.type) {
    case "ADD_HABIT":
      persistHabit(action.habit, state.token);
      return {
        ...state,
        habits: [...state.habits, action.habit],
      };
    case "UPDATE_HABIT":
      updateHabit(action.habit, state.token);
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.habit.id ? action.habit : habit
        ),
      };
    case "DELETE_HABIT":
      deleteHabit(action.habit, state.token);
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.habit.id),
      };
    case "LOAD_HABITS":
      return {
        ...state,
        habits: action.habits,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_USER_ID":
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const loadHabits = async () => {
    const habits = await getUserHabits(state.userId, state.token);
    dispatch({ type: "LOAD_HABITS", habits });
  };

  useEffect(() => {
    loadHabits();
  }, [state.token]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
