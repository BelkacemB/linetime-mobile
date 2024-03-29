/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Habit from "./model/Habit";
import { Suggestion } from "./model/LinetimeTypes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  SuggestionForm: undefined;
  SuggestionList: { listOfSuggestions: Suggestion[] };
  HabitList: undefined;
  AddEditHabit: undefined;
  AddEditPlaylist: undefined;
  PlaylistTimer: undefined;
  BottomTabs: undefined;
};

export type RootLoginParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  SuggestionForm: undefined;
  SuggestionList: { listOfSuggestions: Suggestion[] };
  HabitList: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
