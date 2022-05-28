import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useContext } from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity, View, Text } from '../../components/Themed'
import Habit, { HabitBuilder } from '../../model/Habit';
import { HabitContext } from '../../Store'

export const AddHabit = () => {

  const [name, setName] = React.useState('');
  const [benefit, setBenefit] = React.useState<number[]>();
  const [fun, setFun] = React.useState<number[]>();

  const { dispatch } = useContext(HabitContext)

  const buildAndRegisterHabit = () => {
    let habit: Habit = new HabitBuilder()
      .setId(Math.random())
      .setName(name)
      .setBenefits(benefit[0])
      .setFun(fun[0])
      .build();

    dispatch({ type: 'ADD_HABIT', payload: habit })
  }

  return (
    <View style={styles.container}>
      <Text>Add new habit</Text>
      <TextInput
        placeholder="Habit name"
        onChangeText={(text) => { setName(text) }}
      />

      <MultiSlider values={[3]} min={0} max={3} onValuesChange={(values) => setBenefit(values)} step={1} />
      <MultiSlider values={[3]} min={0} max={3} onValuesChange={(values) => setFun(values)} step={1} />

      <TouchableOpacity onPress={() => {
        buildAndRegisterHabit()
      }}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
