import React from "react";
import { StyleSheet } from "react-native";
import { SuggestionElement } from "../../components/SuggestionElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import { Suggestion } from "../../model/LinetimeTypes";
import { getTimeOfDay } from "../../constants/Util";
import { AppContext } from "../../model/Store";

export const SuggestionList = ({ navigation, route }) => {
  const { listOfSuggestions } = route.params;
  const {
    state: { habits },
  } = React.useContext(AppContext);
  const [suggestions, setSuggestions] = React.useState(listOfSuggestions);

  const onRejectOrAccept = (suggestion: Suggestion) => {
    setSuggestions(suggestions.filter((s) => s.id !== suggestion.id));
  };

  const onAcceptAll = () => {
    // Find matching habits and clock in
    suggestions.forEach((suggestion) => {
      const matchingHabit = habits.find((habit) => habit.id === suggestion.id);
      if (matchingHabit) {
        matchingHabit.clockIn();
      }
    });
    navigation.navigate("Home");
  };

  const onRejectAll = () => {
    navigation.navigate("SuggestionForm");
  };

  return (
    <View style={styles.container}>
      {suggestions.length == 0 ? (
        <Text style={{ fontSize: 20, margin: 10 }}>
          No suggestions for now! Try adding new habits to your playlist
        </Text>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, margin: 30, fontWeight: "bold" }}>
            Good {getTimeOfDay()}!
          </Text>
          <Text style={{ fontSize: 25, margin: 30, fontStyle: "italic" }}>
            Here's your optimized playlist for today:
          </Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        </View>
      )}
      <View>
        {suggestions.map((suggestion) => (
          <SuggestionElement
            suggestion={suggestion}
            key={suggestion.name}
            onRejectOrAccept={onRejectOrAccept}
          />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity style={styles.button} onPress={onAcceptAll}>
          <Text>Accept all ✅</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRejectAll}>
          <Text>Reject all ❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  separator: {
    marginVertical: 20,
    height: 2,
    width: "80%",
  },
  button: {
    marginBottom: 20,
    shadowOpacity: 0.2,
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    width: "35%",
    alignItems: "center",
    shadowColor: "#000",
  },
});
