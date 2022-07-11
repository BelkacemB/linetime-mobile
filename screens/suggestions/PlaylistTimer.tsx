import React from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Suggestion } from "../../model/LinetimeTypes";
import { Text, View } from "../../components/Themed";
import { StyleSheet } from "react-native";

export const PlaylistTimer = ({ navigation, route }) => {
  // TODO Complete the suggestion switch
  const suggestions = route.params.suggestions;

  const [currentSuggestion, setCurrentSuggestion] = React.useState(
    suggestions[0]
  );
  const totalTime = suggestions.reduce(
    (acc, curr) => acc + curr.suggestedTime,
    0
  );

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <Text>
        {minutes}:{seconds} - {currentSuggestion.name}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying
        duration={totalTime * 60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
      >
        {children}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
