import React from "react";
import { StyleSheet } from "react-native";
import { SuggestionElement } from "../../components/SuggestionElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import { SwipeListView } from "react-native-swipe-list-view";
import { Suggestion } from "../../model/LinetimeTypes";
import { getTimeOfDay } from "../../constants/Util";
import { AppContext } from "../../model/Store";
import useUserId from "../../hooks/useUserId";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { ConfirmCheckIn } from "../../components/dialogs/ConfirmCheckIn";
import Habit from "../../model/Habit";

export const SuggestionList = ({ navigation, route }) => {
  const { listOfSuggestions } = route.params;
  const {
    state: { habits },
    dispatch,
  } = React.useContext(AppContext);

  const [suggestions, setSuggestions] =
    React.useState<Suggestion[]>(listOfSuggestions);
  const [habitToCheckIn, setHabitToCheckIn] = React.useState<Habit>(null);

  const userId = useUserId();

  const onReject = (suggestion: Suggestion) => {
    setSuggestions(suggestions.filter((s) => s.id !== suggestion.id));
  };

  const onAcceptAll = () => {
    // Find matching habits and clock in
    navigation.navigate("PlaylistTimer", {
      suggestions: suggestions,
      onTimeElapsed: () => {
        // Find all habits that match the suggestions and clock in
        suggestions.forEach((suggestion) => {
          const matchingHabit = habits.find(
            (habit) => habit.id === suggestion.id
          );
          if (matchingHabit) {
            matchingHabit.clockIn();
            dispatch({ type: "UPDATE_HABIT", habit: matchingHabit });
          }
        });
        navigation.goBack();
      },
    });
  };

  const onConfirmCheckIn = (habit: Habit) => {
    // Complete later
  };

  const onRejectAll = () => {
    navigation.goBack();
  };

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        onPress={() => {
          onReject(data.item);
        }}
      >
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => {
          const matchingHabit = habits.find(
            (habit) => habit.id === data.item.id
          );
          if (matchingHabit) {
            setHabitToCheckIn(matchingHabit);
          }
        }}
      >
        <AntDesign name="check" size={24} color="green" />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ConfirmCheckIn
        visible={habitToCheckIn !== null}
        habit={habitToCheckIn}
        onConfirmCheckIn={onConfirmCheckIn}
        onCancel={() => setHabitToCheckIn(null)}
        onChangeNote={(note) => {
          habitToCheckIn.clockInWithNote(note);
          dispatch({ type: "UPDATE_HABIT", habit: habitToCheckIn });
        }}
      />

      <View style={styles.container}>
        {suggestions.length == 0 ? (
          <Text style={{ fontSize: 20, margin: 10 }}>
            No suggestions for now! Try adding new habits to your playlist
          </Text>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 25,
                margin: 30,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Good {getTimeOfDay()}, {userId.substring(0, 8)}! 🙌
            </Text>
            <Text
              style={{
                fontSize: 25,
                margin: 30,
                fontStyle: "italic",
                textAlign: "justify",
              }}
            >
              🤖 Here's your freshly computer-generated playlist
            </Text>
          </View>
        )}
        {suggestions.length > 0 && (
          <View style={styles.suggestionList}>
            <SwipeListView
              data={suggestions}
              renderItem={({ item }) => (
                <SuggestionElement
                  suggestion={item}
                  onRejectOrAccept={onReject}
                />
              )}
              renderHiddenItem={renderHiddenItem}
              keyExtractor={(item) => item.id}
              leftOpenValue={75}
              rightOpenValue={-75}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity style={styles.button} onPress={onAcceptAll}>
                <FontAwesome name="hourglass-start" size={24} color="black" />
                <Text>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onRejectAll}>
                <AntDesign name="back" size={24} color="black" />
                <Text>Try again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  button: {
    marginBottom: 20,
    marginHorizontal: 5,
    shadowOpacity: 0.2,
    borderRadius: 10,
    padding: 10,
    width: "35%",
    elevation: 5,
    alignItems: "center",
    shadowColor: "#000",
  },
  suggestionList: {
    justifyContent: "space-between",
    shadowOpacity: 0.5,
    borderTopWidth: 0.2,
    borderRadius: 20,
    shadowColor: "#000",
    padding: 10,
    flex: 1,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    right: 0,
  },
});
