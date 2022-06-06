import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { Button, ScrollView, StyleSheet, TextInput } from "react-native";

import { persistHabit } from "../../api/HabitService";
import { Chip, ToggleButton } from "react-native-paper";

import { TouchableOpacity, View, Text } from "../../components/Themed";
import { transparentSecondaryColor } from "../../constants/Colors";

import Habit, { HabitBuilder, TimeOfDay } from "../../model/Habit";
import useUserId from "../../hooks/useUserId";
import useHabitTags from "../../hooks/useHabitTags";

const TIMES_OF_DAY = ["Morning", "Afternoon", "Evening"];
const ICONS_BY_TIMES_OF_DAY = {
  Morning: "weather-sunset-up",
  Afternoon: "weather-sunset-down",
  Evening: "weather-night"
};

export const AddHabit = ({ navigation, route }) => {
  const { onAdd } = route.params;

  // Activity
  const [name, setName] = React.useState("");
  const [benefit, setBenefit] = React.useState<number[]>([0]);
  const [energy, setEnergy] = React.useState<number[]>([0]);
  const [minAndMax, setMinAndMax] = React.useState<number[]>([20, 40]);
  const [timesOfDay, setTimesOfDay] = React.useState<string[]>(TIMES_OF_DAY);

  const {
    tags,
    selectedTags,
    newTag,
    setNewTag,
    onAddTag,
    toggleTagSelection,
  } = useHabitTags();

  const userId = useUserId();

  function buildAndRegisterHabit() {
    let habit: Habit = new HabitBuilder()
      .setName(name)
      .setBenefits(benefit[0])
      .setEnergy(energy[0])
      .setMinTime(minAndMax[0])
      .setMaxTime(minAndMax[1])
      .setUserId(userId)
      .setTags(selectedTags)
      .setTimesOfDay(timesOfDay)
      .setCreationDate(new Date())
      .setLastDone(new Date())
      .build();

    persistHabit(habit);
    onAdd();

    navigation.navigate("HabitList");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new habit</Text>
      <TextInput
        placeholder="Habit name"
        onChangeText={(text) => {
          setName(text);
        }}
        style={styles.textInput}
      />

      <Text style={{ fontSize: 20 }}>
        How beneficial is this activity to you?
      </Text>
      <MultiSlider
        values={benefit}
        min={0}
        max={3}
        onValuesChange={(values) => setBenefit(values)}
      />

      <Text style={{ fontSize: 20 }}>Energy requirement:</Text>
      <MultiSlider
        values={energy}
        min={0}
        max={3}
        onValuesChange={(values) => setEnergy(values)}
      />

      <Text style={{ fontSize: 20 }}>Min and max times</Text>
      <MultiSlider
        values={minAndMax}
        min={10}
        max={120}
        onValuesChange={(values) => setMinAndMax(values)}
        step={1}
      />

      <Text style={{ fontSize: 20 }}>Time of the day</Text>
      <View style={{ flexDirection: "row" }}>
        {TIMES_OF_DAY.map((key) => (
          <ToggleButton
            icon={ICONS_BY_TIMES_OF_DAY[key]}
            value={key}
            status={timesOfDay.includes(key) ? "checked" : "unchecked"}
            onPress={() => {
              if (timesOfDay.includes(key)) {
                setTimesOfDay(timesOfDay.filter((t) => t !== key));
              } else {
                setTimesOfDay([...timesOfDay, key]);
              }
            }}
            style={{ marginRight: 10, width: 40 }}
          />
        ))}
      </View>

      {/* Add tags */}
      <Text style={{ fontSize: 20 }}>#tags</Text>
      <ScrollView>
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

        <TextInput
          placeholder="Tag"
          style={{ height: 30, margin: 5 }}
          value={newTag}
          onChangeText={(text) => {
            setNewTag(text);
          }}
        />
        <Button title="Add" onPress={onAddTag} />
      </ScrollView>
      {/* Display chips for tags */}

      <TouchableOpacity
        onPress={() => {
          buildAndRegisterHabit();
        }}
        style={styles.button}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  textInput: {
    width: "40%",
    height: 40,
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
