import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { SuggestionElement } from "../../components/SuggestionElement";
import { Text, View } from "../../components/Themed";

export const SuggestionList = ({ route }) => {
  const { listOfSuggestions } = route.params;
  return (
    <View style={styles.container}>
      {listOfSuggestions.length == 0 && (
        <Text style={{fontSize: 20}}>No suggestions for now! Try adding new habits to your playlist</Text>
      )}
      {listOfSuggestions.map((suggestion) => (
        <SuggestionElement suggestion={suggestion} key={suggestion.name} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
