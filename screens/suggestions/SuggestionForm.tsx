import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { Text, TouchableOpacity, View } from "../../components/Themed";
import DropDownPicker from "react-native-dropdown-picker";
import CircleSlider from "../../components/CircleSlider";

import { fetchSuggestions, SuggestionRequest } from "../../api/LinetimeService";

import {
  secondaryColor,
  transparentSecondaryColor,
} from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import useUserId from "../../hooks/useUserId";
import { Chip } from "react-native-paper";
import useHabitTags from "../../hooks/useHabitTags";

const energyTypeItems = [
  { label: "Tired", value: 2 },
  { label: "Normal", value: 3 },
  { label: "Energetic", value: 6 },
];

export default function SuggestionForm({
  navigation,
}: RootTabScreenProps<"SuggestionForm">) {
  const userId = useUserId();

  // Form state
  const [energy, setEnergy] = useState<number>(6);
  const [timeInMinutes, setTimeInMinutes] = useState<number>(60);
  const { tags, selectedTags, toggleTagSelection } = useHabitTags();
  // UI state
  const [energyOpen, setEnergyOpen] = useState(false);

  const handleTimeSlide = (value: number) => {
    const minutes = Math.round(value / 3);
    // Do not update state on the first rendering
    if (minutes !== timeInMinutes) {
      setTimeInMinutes(minutes);
    }
    return minutes;
  };

  const onSubmit = () => {
    const suggestionRequest: SuggestionRequest = {
      time: timeInMinutes,
      energy: energy,
      userId: userId,
      tags: selectedTags,
    };
    fetchSuggestions(suggestionRequest).then((suggestions) => {
      navigation.navigate("SuggestionList", { listOfSuggestions: suggestions });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Describe your current state</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Energy */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>I'm feeling </Text>
        <DropDownPicker
          open={energyOpen}
          value={energy}
          items={energyTypeItems}
          setValue={setEnergy}
          setOpen={setEnergyOpen}
          style={{ width: 150 }}
        />
      </View>
      {/* Tags */}
      <View
        style={styles.blank}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View
        style={{ alignItems: "center", justifyContent: "center", zIndex: -3 }}
      >
        <Text>Tags </Text>
        <View style={{ flexDirection: "row" }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              style={{ margin: 5, height: 30 }}
              onPress={() => {
                toggleTagSelection(tag);
              }}
              selected={selectedTags.includes(tag)}
            >
              {tag}
            </Chip>
          ))}
        </View>
      </View>

      {/* Line of empty text */}
      <View
        style={styles.blank}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Time */}
      <View
        style={{
          flexDirection: "column",
          zIndex: -5,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text>Time available</Text>
        <CircleSlider
          value={timeInMinutes}
          min={20}
          max={300}
          onValueChange={handleTimeSlide}
          dialRadius={80}
          meterColor={secondaryColor}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text>LineTime 🚀</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  blank: {
    marginVertical: 15,
    height: 1,
    width: "80%",
    opacity: 0,
  },
  textInput: {
    width: 80,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#eee",
  },
  button: {
    backgroundColor: transparentSecondaryColor,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    bottom: 20,
  },
});
