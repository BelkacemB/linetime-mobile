import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { useReducer } from 'react';
import { HabitContext, habitReducer } from './Store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const initialState = {
    habits: []
  }
  
  const [state, dispatch] = useReducer(habitReducer, initialState)

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <HabitContext.Provider value={{ state, dispatch }}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </HabitContext.Provider>
    );
  }
}
