import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { persistHabit } from "../../api/HabitService";
import { Chip } from "react-native-paper";

import { TouchableOpacity, View, Text } from "../../components/Themed";
import { transparentSecondaryColor } from "../../constants/Colors";

import Habit, { HabitBuilder } from "../../model/Habit";
import useUserId from "../../hooks/useUserId";
import useHabitTags from "../../hooks/useHabitTags";

export const AddHabit = ({ navigation, route }) => {
  const { onAdd, availableTags } = route.params;

  console.log("Available tags from Add habit");
  console.log(availableTags);
  // Activity
  const [name, setName] = React.useState("");
  const [benefit, setBenefit] = React.useState<number[]>([0]);
  const [energy, setEnergy] = React.useState<number[]>([0]);
  const [fun, setFun] = React.useState<number[]>([0]);

  const {tags, selectedTags, newTag, setNewTag, onAddTag, toggleTagSelection} = useHabitTags();

  const userId = useUserId();

  function buildAndRegisterHabit() {
    let habit: Habit = new HabitBuilder()
      .setName(name)
      .setBenefits(benefit[0])
      .setFun(fun[0])
      .setEnergy(energy[0])
      .setMinTime(20)
      .setMaxTime(40)
      .setUserId(userId)
      .setTags(selectedTags)
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

      <Text style={{ fontSize: 20 }}>How fun is this activity to you?</Text>
      <MultiSlider
        values={fun}
        min={0}
        max={3}
        onValuesChange={(values) => setFun(values)}
      />

      <Text style={{ fontSize: 20 }}>How tiring is this activity to you?</Text>
      <MultiSlider
        values={energy}
        min={0}
        max={3}
        onValuesChange={(values) => setEnergy(values)}
      />

      {/* Add tags */}
      <Text style={{ fontSize: 20 }}>#tags</Text>
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

        <TextInput
          placeholder="Tag"
          style={{ width: "20%" }}
          value={newTag}
          onChangeText={(text) => {
            setNewTag(text);
          }}
        />
        <Button
          title="Add tag"
          onPress={onAddTag}
        />
      </View>
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
    width: "80%",
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
