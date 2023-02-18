import React, { useReducer, Dispatch, useEffect } from "react";
import Habit from "./Habit";
import {
  persistHabit,
  updateHabit,
  deleteHabit,
  getUserHabits,
} from "../api/HabitService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Playlist from "./Playlist";
import { getUserPlaylists } from "../api/PlaylistService";

type HabitAction =
  | { type: "ADD_HABIT"; habit: Habit }
  | { type: "UPDATE_HABIT"; habit: Habit }
  | { type: "DELETE_HABIT"; habit: Habit }
  | { type: "LOAD_HABITS"; habits: Habit[] }
  | { type: "LOAD_PLAYLISTS"; playlists: Playlist[] }
  | { type: "SET_TOKEN"; token: string }
  | { type: "SET_USER_ID"; userId: string };

type InitialStateType = {
  habits: Habit[];
  playlists: Playlist[],
  token: string;
  userId: string;
  status: string;
};

const initialState = {
  habits: [] as Habit[],
  playlists: [] as Playlist[],
  token: "",
  userId: "",
  status: "initial",
};

const persistHabitAndGetId = async (
  habit: Habit,
  token: string) => {
  const id = await persistHabit(habit, token);
  return id;
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
      persistHabitAndGetId(action.habit, state.token).then(
        (id) => {
          action.habit.id = id;
        }
      );
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
        status: "loaded",
      };
    case "LOAD_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
        status: "loaded",
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
  const [user] = useAuthState(auth);
  const [token, setToken] = React.useState("");

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const loadHabits = async () => {
    const habits = await getUserHabits(state.userId, token);
    dispatch({ type: "LOAD_HABITS", habits });
  };

  const loadPlaylists = async () => {
    const playlists = await getUserPlaylists(state.userId, token);
    dispatch({ type: "LOAD_PLAYLISTS", playlists });
  };

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
      });
    }
  }, [user]);

  // Set the user token and user id on mount
  useEffect(() => {
    if (user) {
      dispatch({ type: "SET_TOKEN", token: token });
      dispatch({ type: "SET_USER_ID", userId: user.uid });
      loadHabits();
    }
  }, [user, token]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
