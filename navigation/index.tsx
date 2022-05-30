import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SuggestionForm from "../screens/suggestions/SuggestionForm";
import { SuggestionList } from "../screens/suggestions/SuggestionList";
import { HabitList } from "../screens/habits/HabitList";
import { AddHabit } from "../screens/habits/AddHabit";
import { EditHabit } from "../screens/habits/EditHabit";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuggestionForm"
        component={SuggestionForm}
        options={{ title: "What to do?" }}
      />
      <Stack.Screen
        name="SuggestionList"
        component={SuggestionList}
        options={{ title: "Suggestions" }}
      />

      <Stack.Screen
        name="HabitList"
        component={HabitList}
        options={{ title: "Habit list" }}
      />
      <Stack.Screen
        name="AddHabit"
        component={AddHabit}
        options={{ title: "Add a new habit" }}
      />
      <Stack.Screen
        name="EditHabit"
        component={EditHabit}
        options={{ title: "View habit" }}
      />
    </Stack.Navigator>
  );
}
