import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { persistHabit } from "../../api/HabitService";

import { TouchableOpacity, View, Text } from "../../components/Themed";
import { transparentSecondaryColor } from "../../constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";

import Habit, { HabitBuilder } from "../../model/Habit";
import useUserId from "../../hooks/useUserId";

export const AddHabit = ({ navigation, route }) => {
  const { onAdd, availableCategories } = route.params;

  // Activity
  const [name, setName] = React.useState("");
  const [benefit, setBenefit] = React.useState<number[]>([0]);
  const [energy, setEnergy] = React.useState<number[]>([0]);
  const [fun, setFun] = React.useState<number[]>([0]);
  const [category, setCategory] = React.useState<string>(null);
  const [categories, setCategories] = React.useState<string[]>(
    availableCategories ?? []
  );

  // UI
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const [newCategoryInputDisplayed, setNewCategoryInputDisplayed] =
    React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState("");

  const addCategory = (name: string) => {
    setCategories([...categories, name]);
    setCategory(name);
    setCategoryOpen(false);
    setNewCategoryInputDisplayed(false);
  };

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
      .setCategory(category)
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

      <Text style={{ fontSize: 20 }}>Categorize this activity</Text>
      {/* Create a dropdown and center it horizontally */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <DropDownPicker
          open={categoryOpen}
          value={category}
          items={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          setValue={setCategory}
          setOpen={setCategoryOpen}
          style={{ width: 150 }}
        />
      </View>

      {/* Button to add category */}
      <Button
        title="+ Add category"
        onPress={() => {
          setNewCategoryInputDisplayed(true);
        }}
      />

      {/* TODO Move this to a separate component */}
      {newCategoryInputDisplayed && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder="New category"
            style={styles.textInput}
            onChangeText={(text) => {
              setNewCategoryName(text);
            }}
          />
          <Button
            title="Add"
            onPress={() => {
              addCategory(newCategoryName);
            }}
          />
        </View>
      )}

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
    position: "absolute",
    bottom: 20,
  },
});
