import React from 'react'
import { FlatList } from 'react-native'
import { Text, View } from '../components/Themed'

export const SuggestionList = ({route, navigation}) => {
  const {listOfSuggestions} = route.params
  console.log(listOfSuggestions)

  return (
    <View>
        <Text>Suggestion list</Text>
        <FlatList data={listOfSuggestions} renderItem={({item}) => <Text>{item.Activity}</Text>}  />
    </View>
  )
}
