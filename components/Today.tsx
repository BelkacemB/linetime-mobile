import React from 'react'
import { Text, View } from '../components/Themed'
import { StyleSheet } from 'react-native';

export const Today = () => {
  return (
    <View style={styles.dateContainer}>
    <Text style={styles.dateText}>
      {new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </Text>
  </View>
  )
}

const styles = StyleSheet.create({
    dateContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
      },
      dateText: {
        fontSize: 15,
        fontStyle: 'italic'
      }  
})
