import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Text, TouchableOpacity, View } from "../../components/Themed";
import RNPickerSelect from "react-native-picker-select";
import { Switch } from "@rneui/base";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import { fetchSuggestions, SuggestionRequest } from "../../api/LinetimeService";

import { secondaryColor } from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import useUserToken from "../../hooks/useUserToken";
import useHabitTags from "../../hooks/useHabitTags";
import { SelectChip } from "../../components/SelectChip";
import SimpleLineIcons from "@expo/vector-icons/build/SimpleLineIcons";
import { Feather, Ionicons } from "@expo/vector-icons";
import { getDefaultEnergyLevel } from "../../constants/Util";
import { AppContext } from "../../model/Store";

const energyTypeItems = [
  { label: "tired", value: 2 },
  { label: "normal", value: 3 },
  { label: "fresh", value: 6 },
];

export default function SuggestionForm({
  navigation,
}: RootTabScreenProps<"SuggestionForm">) {
  const userToken = useUserToken();
  const {
    state: { habits },
  } = useContext(AppContext);
  // Form state
  const [energy, setEnergy] = useState<number>(getDefaultEnergyLevel());
  const [timeInMinutes, setTimeInMinutes] = useState<number>(60);
  const { tags, selectedTags, toggleTagSelection } = useHabitTags(habits);

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
      navigation.push("SuggestionList", { listOfSuggestions: suggestions });
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Describe your current state</Text>

      {/* Energy */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <SimpleLineIcons name="energy" size={25} color="black" />
        <Text style={{ fontSize: 20 }}> I'm feeling </Text>
        <RNPickerSelect
          value={energy}
          items={energyTypeItems}
          onValueChange={setEnergy}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
        />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Time */}
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Time available</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          <Ionicons name="timer-outline" size={24} color="black" />
          {timeInMinutes} minutes
        </Text>

        <MultiSlider
          values={[timeInMinutes]}
          min={20}
          max={120}
          onValuesChange={(values) => setTimeInMinutes(values[0])}
          step={5}
          selectedStyle={{ backgroundColor: secondaryColor }}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Feather name="sun" size={24} color={secondaryColor} />
        <View style={{ justifyContent: "center" }}>
          <Text>Time specific activities </Text>
        </View>
        <Switch
          value={timeSpecific}
          onValueChange={(value) => setTimeSpecific(value)}
          color={secondaryColor}
        />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Tags */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>#tags </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
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

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginLeft: 10 }}>🚀 LineTime</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    justifyContent: "space-around",
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
    marginBottom: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    width: "40%",
    alignItems: "center",
    shadowColor: "#000",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    fontStyle: "italic",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderStyle: "solid",
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    fontStyle: "italic",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderStyle: "solid",
    color: "black",
  },
});
