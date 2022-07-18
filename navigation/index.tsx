import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Text, ColorSchemeName } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList, RootLoginParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SuggestionForm from "../screens/suggestions/SuggestionForm";
import { SuggestionList } from "../screens/suggestions/SuggestionList";
import { HabitList } from "../screens/habits/HabitList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Login } from "../screens/login/Login";
import { SignUp } from "../screens/login/SignUp";
import { AddEditHabit } from "../screens/habits/AddEditHabit";
import App from "../App";
import { Skeleton } from "@rneui/base";
import { AppProvider } from "../model/Store";
import { PlaylistTimer } from "../screens/suggestions/PlaylistTimer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      {loading && <Skeleton style={{ width: "100%", height: "100%" }} />}
      {error && <Text> {error.message} </Text>}
      {user ? <RootNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const HomeStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <AppProvider>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="BottomTabs"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="SuggestionForm"
          component={SuggestionForm}
          options={{ title: "What to do?" }}
        />
        <HomeStack.Screen
          name="PlaylistTimer"
          component={PlaylistTimer}
          options={{ title: "What to do?" }}
        />
        <HomeStack.Screen
          name="SuggestionList"
          component={SuggestionList}
          options={{ title: "Suggestions" }}
        />

        <HomeStack.Screen
          name="HabitList"
          component={HabitList}
          options={{ title: "Habit list" }}
        />
        <HomeStack.Screen
          name="AddEditHabit"
          component={AddEditHabit}
          options={{ title: "Add/edit habit" }}
        />
        {/* Add the bottom tab navigator to the stack navigator */}
      </HomeStack.Navigator>
    </AppProvider>
  );
}

const LoginStack = createNativeStackNavigator<RootLoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Playlist" component={HabitList} />
      <BottomTab.Screen name="Play" component={SuggestionForm} />
    </BottomTab.Navigator>
  );
}

registerRootComponent(App);
