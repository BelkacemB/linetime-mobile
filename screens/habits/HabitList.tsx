import React, {useContext} from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { HabitElement } from '../../components/HabitElement'
import { Text, TouchableOpacity, View } from '../../components/Themed'
import { HabitContext } from '../../Store'

export const HabitList = ({ navigation }) => {
    
    const { state } = useContext(HabitContext)

    return (
            <View style={styles.container}>
               <FlatList
                        data={state.habits}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (<HabitElement habit={item} navigation={navigation} />)}
                    />
                {/* Add a new habit */}
                <View>
                    <TouchableOpacity  onPress={() => { navigation.navigate('AddHabit') }}>
                        <Text style= {{fontSize: 20, marginBottom:10}}>➕ Add new habit</Text>
                    </TouchableOpacity>
                </View>

            </View>
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