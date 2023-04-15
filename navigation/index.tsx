import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Text, ColorSchemeName } from "react-native";

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
import { AppProvider } from "../model/Store";
import { PlaylistTimer } from "../screens/suggestions/PlaylistTimer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { secondaryColor } from "../constants/Colors";
import { SplashScreen } from "../screens/SplashScreen";
import { PlaylistsList } from "../screens/playlists/PlaylistsList";
import { AddEditPLaylist } from "../screens/playlists/AddEditPLaylist";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [user, loading, error] = useAuthState(auth);

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          {error && <Text> {error.message} </Text>}
          {user ? <RootNavigator /> : <LoginNavigator />}
        </>
      )}
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
          name="SuggestionForm"
          component={SuggestionForm}
          options={{ title: "Optimize" }}
        />
        <HomeStack.Screen
          name="PlaylistTimer"
          component={PlaylistTimer}
          options={{ title: "Timer" }}
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
        <HomeStack.Screen
          name="AddEditPlaylist"
          component={AddEditPLaylist}
          options={{ title: "Add/edit playlist" }}
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
    <BottomTab.Navigator
      initialRouteName="Optimize"
      screenOptions={{
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <BottomTab.Screen
        name="Optimize"
        component={SuggestionForm}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="robot" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Habits"
        component={HabitList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="meditation" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Playlists"
        component={PlaylistsList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-edit"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

registerRootComponent(App);
