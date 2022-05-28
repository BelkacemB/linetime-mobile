import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SuggestionElement } from '../../components/SuggestionElement'
import { View } from '../../components/Themed'

export const SuggestionList = ({route}) => {
  const {listOfSuggestions} = route.params
  console.log(listOfSuggestions)

  return (
    <View style={styles.container}>
        <FlatList data={listOfSuggestions} renderItem={({item}) => <SuggestionElement suggestion={item} />}  />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
