import React, { useReducer } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Text, TouchableOpacity, View } from '../../components/Themed'
import { primaryColor } from '../../constants/Colors'
import Habit from '../../model/Habit'
import { HabitContext, habitReducer } from '../../Store'

export const HabitList = ({ navigation }) => {
    // TODO Move this up to the store
    type HabitContext = {
        habits: Array<Habit>
    }

    // This will be an API call in the future
    const initialState: HabitContext = {
        habits: []
    }

    const [state, dispatch] = useReducer(habitReducer, initialState)

    return (
        <HabitContext.Provider value={{ state, dispatch }}>
            {/* List os existing habits */}
            <View style={styles.container}>
                
                <View>
                    <FlatList
                        data={state.habits}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (<Text>{item.id}</Text>)}
                    />

                </View>

                <View style={styles.separator} lightColor={primaryColor} darkColor="rgba(255,255,255,0.1)" />

                {/* Add a new habit */}
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('AddHabit') }}>
                        <Text>➕ Add new habit</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </HabitContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        opacity: 0.2,
      }
})