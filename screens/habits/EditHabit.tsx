import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text, View, TouchableOpacity } from '../../components/Themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { HabitBuilder } from '../../model/Habit';
import { transparentSecondaryColor } from '../../constants/Colors';


export const EditHabit = ({ navigation, route }) => {

    let { habit } = route.params;

    const originalHabit = new HabitBuilder().copy(habit);

    const updateHabit = () => {
        navigation.goBack();
    }

    // TODO This is still updating the element, fix it 
    const cancelUpdate = () => { 
        habit = originalHabit;
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text>View/edit habit</Text>
            <TextInput
                placeholder="Habit name"
                onChangeText={(text) => { habit.name = text }}
                style={styles.textInput}
                defaultValue={habit.name}
            />

            <Text style={{ fontSize: 20 }}>How beneficial is this activity to you?</Text>
            <MultiSlider values={[habit.benefits?? 0]} min={0} max={3} onValuesChange={(values) => habit.benefits = values[0]} step={0.5} />

            <Text style={{ fontSize: 20 }}>How fun is this activity to you?</Text>
            <MultiSlider values={[habit.fun?? 0]} min={0} max={3} onValuesChange={(values) => habit.fun = values[0]} step={0.5} />

            {/* TODO Style the buttons correctly */}
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => { updateHabit() }}  >
                    <Text>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { cancelUpdate() }}  >
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        width: 80,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#eee"
    },
    button: {
        backgroundColor: transparentSecondaryColor,
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        position: 'absolute',
        bottom: 20
    }
})

