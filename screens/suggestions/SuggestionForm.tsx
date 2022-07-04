import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

import { Text, TouchableOpacity, View } from "../../components/Themed";
import RNPickerSelect from 'react-native-picker-select';
import CircleSlider from "../../components/CircleSlider";
import { Switch } from "@rneui/base";

import { fetchSuggestions, SuggestionRequest } from "../../api/LinetimeService";

import {
  secondaryColor,
} from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import useUserToken from "../../hooks/useUserToken";
import useHabitTags from "../../hooks/useHabitTags";
import { SelectChip } from "../../components/SelectChip";
import SimpleLineIcons from "@expo/vector-icons/build/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/build/Ionicons";

const energyTypeItems = [
  { label: "tired", value: 2 },
  { label: "normal", value: 3 },
  { label: "energetic", value: 6 },
];

export default function SuggestionForm({
  navigation,
}: RootTabScreenProps<"SuggestionForm">) {
  const userToken = useUserToken();

  // Form state
  const [energy, setEnergy] = useState<number>(6);
  const [timeInMinutes, setTimeInMinutes] = useState<number>(60);
  const { tags, selectedTags, toggleTagSelection } = useHabitTags();
  // UI state
  const [timeSpecific, setTimeSpecific] = useState(false);

  const handleTimeSlide = (value: number) => {
    const minutes = Math.round(value / 3);
    // Do not update state on the first rendering
    if (minutes !== timeInMinutes) {
      setTimeInMinutes(minutes);
    }
    return minutes;
  };

  const onSubmit = () => {
    // Get local time in hh:mm format withouth seconds
    const time = new Date()
      .toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })
      .substring(0, 5);
    const suggestionRequest: SuggestionRequest = {
      time: timeInMinutes,
      energy: energy,
      token: userToken,
      tags: selectedTags,
    };

    if (timeSpecific) {
      suggestionRequest.localTime = time;
    }

    fetchSuggestions(suggestionRequest).then((suggestions) => {
      navigation.navigate("SuggestionList", { listOfSuggestions: suggestions });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Describe your current state</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Energy */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SimpleLineIcons name="energy" size={25} color="black" />
        <Text style={{fontSize: 17}}> I'm feeling </Text>
        <RNPickerSelect
          value={energy}
          items={energyTypeItems}
          onValueChange={setEnergy}
          style={pickerSelectStyles}
        />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Tags */}
      <View
        style={{ alignItems: "center", justifyContent: "center"}}
      >
        <Text style={{fontWeight: "bold"}}>#tags </Text>
        <View style={{ flexDirection: "row" }}>
          {tags.map((tag) => (
            <SelectChip
              label={tag.toLowerCase()}
              key={tag}
              onPress={() => {
                toggleTagSelection(tag);
              }}
              selected={selectedTags.includes(tag)}
            />
          ))}
        </View>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ flexDirection: "row" }}>
      <Ionicons name="time-outline" size={25} color="black" />
        <View style={{ justifyContent: "center" }}>
          
          <Text>Time specific activities </Text>
        </View>
        <Switch
          value={timeSpecific}
          onValueChange={(value) => setTimeSpecific(value)}
          color={secondaryColor}
        />
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
        <Text>Play 🚀</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexGrow: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 20,
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
    margin: 10,
    shadowOpacity: 0.2,
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontStyle: "italic",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
