import React from 'react'
import Habit from '../model/Habit'
import { Text, View, TouchableOpacity } from './Themed'

type HabitProps = {
    habit: Habit,
    // Provide type for navigation prop
    navigation: any,
}

export const HabitElement = ({ habit, navigation }: HabitProps) => {

    const editHabit = () => {
        navigation.navigate('EditHabit', { habit: habit })
    }
    
    return (
        <View style={{ flexDirection: 'row', flex: 1, height: 60, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, padding: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{habit.name}</Text>
            <TouchableOpacity style={{ borderRadius: 50, borderWidth: 1, padding: 10, marginLeft: 20 }} onPress={editHabit} >
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 50, borderWidth: 1, padding: 10 }}>
                <Text>❌</Text>
            </TouchableOpacity>
        </View>
    )
}
