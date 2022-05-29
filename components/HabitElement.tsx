import React, { useContext } from 'react'
import Habit from '../model/Habit'
import { HabitContext } from '../Store'
import { Text, View, TouchableOpacity } from './Themed'

type HabitProps = {
    habit: Habit,
    navigation: any
}

export const HabitElement = ({ habit, navigation }: HabitProps) => {

    const { dispatch } = useContext(HabitContext)

    const deleteHabit = () => {
        dispatch({ type: 'REMOVE_HABIT', payload: habit.id })
    }

    const editHabit = () => {
        navigation.navigate('EditHabit', { habit: habit })
    }
    
    return (
        <View style={{ flexDirection: 'row', flex: 1, height: 60, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, padding: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{habit.name}</Text>
            <TouchableOpacity style={{ borderRadius: 50, borderWidth: 1, padding: 10, marginLeft: 20 }} onPress={editHabit} >
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 50, borderWidth: 1, padding: 10 }} onPress={deleteHabit}>
                <Text>❌</Text>
            </TouchableOpacity>
        </View>
    )
}
