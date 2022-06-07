import React, { useEffect } from "react";
import { Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { transparentSecondaryColor } from "../../constants/Colors";

import { updateHabit } from "../../api/HabitService";
import useHabitTags from "../../hooks/useHabitTags";
import { Chip } from "@rneui/themed";

export const EditHabit = ({ navigation, route }) => {
  let { habit, onUpdate } = route.params;

  const { tags, newTag, setNewTag, onAddTag, toggleTagSelection } =
    useHabitTags();

  const [selectedTags, setSelectTags] = React.useState(habit.tags);

  useEffect(() => {
    setSelectTags(habit.tags);
  }, [habit]);

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

      <Text style={{ fontSize: 20 }}>How fun is this activity to you?</Text>
      <MultiSlider
        values={[habit.fun ?? 0]}
        min={0}
        max={3}
        onValuesChange={(values) => (habit.fun = values[0])}
        step={0.1}
      />

      <Text style={{ fontSize: 20 }}>How tiring is this activity to you?</Text>
      <MultiSlider
        values={[habit.energy ?? 0]}
        min={0}
        max={3}
        onValuesChange={(values) => (habit.energy = values[0])}
      />

      <Text style={{ fontSize: 20 }}>#tags</Text>
      <View style={{ flexDirection: "row" }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            style={{ margin: 5, height: 30 }}
            onPress={() => {
              toggleTagSelection(tag);
              if (habit.tags.includes(tag)) {
                habit.tags = habit.tags.filter((t) => t !== tag);
              } else {
                habit.tags = [...habit.tags, tag];
              }
            }}
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
          onPress={() => {
            onAddTag();
            setSelectTags([...selectedTags, newTag]);
          }}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Update" onPress={updateCurHabit} />
        <Button
          title="Cancel"
          onPress={() => {
            cancelUpdate();
          }}
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
