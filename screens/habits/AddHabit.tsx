import React, { useContext } from 'react'
import { TouchableOpacity, View, Text } from '../../components/Themed'
import { HabitContext } from '../../Store'

export const AddHabit = () => {

  const { dispatch } = useContext(HabitContext)

  return (
    <View>
      <Text>Add new habit</Text>
      <Text style={{ marginTop: 10 }}>Will be completed later</Text>
      <TouchableOpacity onPress={() => { dispatch({ type: 'ADD_HABIT', payload: { id: 1, name: 'test' } }) }}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}
