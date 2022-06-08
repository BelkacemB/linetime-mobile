import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { SelectChip } from "../../components/SelectChip";
import { transparentSecondaryColor } from "../../constants/Colors";
import { Button } from "@rneui/base";

import { updateHabit } from "../../api/HabitService";
import useHabitTags from "../../hooks/useHabitTags";
import { ButtonGroup } from "@rneui/base";

import { TIMES_OF_DAY } from "../../model/constants";

export const EditHabit = ({ navigation, route }) => {
  let { habit, onUpdate } = route.params;

  const initSelectedIndexes = habit.timesOfDay
    ? TIMES_OF_DAY.map((_, index) =>
        habit.timesOfDay.includes(TIMES_OF_DAY[index]) ? index : -1
      ).filter((index) => index !== -1)
    : [0, 1, 2];
  console.log(initSelectedIndexes);

  const { tags, newTag, setNewTag, onAddTag, toggleTagSelection } =
    useHabitTags();

  const [selectedTags, setSelectTags] = React.useState(habit.tags);
  const [selectedTimeOfDayIndexes, setSelectedTimeOfDayIndexes] =
    React.useState(initSelectedIndexes);

  useEffect(() => {
    setSelectTags(habit.tags);
  }, [habit]);

  useEffect(() => {
    let selectedTimesOfDay = selectedTimeOfDayIndexes.map(
      (index) => TIMES_OF_DAY[index]
    );
    habit.timesOfDay = selectedTimesOfDay;
  }, [selectedTimeOfDayIndexes]);

  const updateCurHabit = () => {
    updateHabit(habit);
    refreshListAndGoBack();
  };

  const cancelUpdate = () => {
    refreshListAndGoBack();
  };

  const refreshListAndGoBack = () => {
    onUpdate();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>View/edit habit</Text>
      <TextInput
        placeholder="Habit name"
        onChangeText={(text) => {
          habit.name = text;
        }}
        style={styles.textInput}
        defaultValue={habit.name}
      />

      <Text style={{ fontSize: 20 }}>
        How beneficial is this activity to you?
      </Text>
      <MultiSlider
        values={[habit.benefits ?? 0]}
        min={0}
        max={3}
        onValuesChange={(values) => (habit.benefits = values[0])}
        step={0.1}
      />

      <Text style={{ fontSize: 20 }}>How tiring is this activity to you?</Text>
      <MultiSlider
        values={[habit.energy ?? 0]}
        min={0}
        max={3}
        onValuesChange={(values) => (habit.energy = values[0])}
      />
      <Text style={{ fontSize: 20 }}>Time of the day</Text>
      <ButtonGroup
        buttons={TIMES_OF_DAY}
        selectMultiple
        selectedIndexes={selectedTimeOfDayIndexes}
        onPress={(value) => {
          setSelectedTimeOfDayIndexes(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <Text style={{ fontSize: 20 }}>#tags</Text>
      <ScrollView horizontal>
        {tags.map((tag) => (
          <SelectChip
            label={tag}
            key={tag}
            onPress={() => {
              toggleTagSelection(tag);
              if (habit.tags.includes(tag)) {
                habit.tags = habit.tags.filter((t) => t !== tag);
              } else {
                habit.tags = [...habit.tags, tag];
              }
            }}
            selected={habit.tags.includes(tag)}
          />
        ))}

        <TextInput
          placeholder="Tag"
          value={newTag}
          onChangeText={(text) => {
            setNewTag(text);
          }}
          style={{ maxHeight: 40, margin: 10 }}
        />
        <Button
          title="Add tag"
          onPress={() => {
            onAddTag();
            setSelectTags([...selectedTags, newTag]);
          }}
          style={{ maxHeight: 40 }}
        />
      </ScrollView>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Update" onPress={updateCurHabit} style={{ margin: 5 }} />
        <Button
          title="Cancel"
          onPress={() => {
            cancelUpdate();
          }}
          style={{ margin: 5 }}
        />
      </View>
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
    position: "absolute",
    bottom: 20,
  },
});
