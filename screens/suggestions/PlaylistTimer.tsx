import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Suggestion } from "../../model/LinetimeTypes";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import { Dimensions, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const PlaylistTimer = ({ navigation, route }) => {
  const suggestions: Suggestion[] = route.params.suggestions;
  const onTimeElapsed = route.params.onTimeElapsed;

  const [currentSuggestion, setCurrentSuggestion] = React.useState(
    suggestions[0]
  );
  const [nextSuggestion, setNextSuggestion] = React.useState(
    suggestions[1] ?? null
  );

  const totalTime = suggestions.reduce(
    (acc, curr) => acc + curr.suggestedTime,
    0
  );

  const suggestionsWithStartAndEndTime = suggestions.map((suggestion) => {
    const startTime = suggestions
      .slice(0, suggestions.indexOf(suggestion))
      .reduce((acc, curr) => acc + curr.suggestedTime, 0);
    const endTime = startTime + suggestion.suggestedTime;
    return { ...suggestion, startTime: startTime, endTime: endTime };
  });

  const onUpdate = (time: number) => {
    const timePassed = totalTime * 60 - time;
    let matchingSuggestion = suggestionsWithStartAndEndTime.find(
      (suggestion) =>
        timePassed >= suggestion.startTime * 60 &&
        timePassed <= suggestion.endTime * 60
    );
    let typedSuggestion = suggestions.find(
      (suggestion) => suggestion.id === matchingSuggestion?.id
    );
    setCurrentSuggestion(typedSuggestion);
  };

  useEffect(() => {
    const followingSuggestion =
      suggestions[suggestions.indexOf(currentSuggestion) + 1];
    setNextSuggestion(followingSuggestion ?? null);
  }, [currentSuggestion]);

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <Text style={{ fontSize: 25 }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    );
  };

  // Take the screen width and multiply it by 0.9
  const width = Math.round(Dimensions.get("window").width * 0.9);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentSuggestion?.name}</Text>
      {nextSuggestion && (
        <Text style={styles.subtitle}>Coming up: {nextSuggestion?.name}</Text>
      )}

      <CountdownCircleTimer
        isPlaying
        duration={totalTime * 60}
        colors={["#1B99AA", "#dddbcb"]}
        colorsTime={[totalTime, Math.round(totalTime / 2)]}
        size={width}
        onUpdate={onUpdate}
        onComplete={onTimeElapsed}
      >
        {children}
      </CountdownCircleTimer>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialIcons name="cancel" size={24} color="black" />
        <Text style={{ fontSize: 20 }}>Abandon</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 10,
    width: "35%",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
  },
});
