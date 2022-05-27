import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SuggestionElement } from '../components/SuggestionElement'
import { Text, View } from '../components/Themed'

export const SuggestionList = ({route}) => {
  const {listOfSuggestions} = route.params
  console.log(listOfSuggestions)

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Suggestion list</Text>
        <FlatList data={listOfSuggestions} renderItem={({item}) => <SuggestionElement suggestion={item} />}  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
