import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import { AirbnbRating, Button, ButtonGroup } from "@rneui/base";
import { persistHabit, updateHabit } from "../../api/HabitService";

import { Text, View } from "../../components/Themed";

import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { SelectChip } from "../../components/SelectChip";
import { secondaryColor } from "../../constants/Colors";
import useHabitTags from "../../hooks/useHabitTags";
import useUserId from "../../hooks/useUserId";
import useUserToken from "../../hooks/useUserToken";
import { TIMES_OF_DAY } from "../../model/constants";
import Habit, { HabitBuilder } from "../../model/Habit";

export const AddEditHabit = ({ navigation, route }) => {
  const { onAdd, onUpdate, habit } = route.params;
  const typedHabit: Habit = habit as Habit;
  const isEditMode = typedHabit !== undefined;

  // Activity
  const [name, setName] = React.useState("");
  const [benefit, setBenefit] = React.useState<number[]>([0]);
  const [energy, setEnergy] = React.useState<number[]>([0]);
  const [minAndMax, setMinAndMax] = React.useState<number[]>([5, 15]);
  const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>([
    0, 1, 2,
  ]);

  const {
    tags,
    selectedTags,
    setSelectedTags,
    setNewTag,
    onAddTag,
    toggleTagSelection,
  } = useHabitTags();

  // Initialize state in edit mode
  useEffect(() => {
    if (isEditMode) {
      setName(typedHabit.name);
      setBenefit([typedHabit.benefits]);
      setEnergy([typedHabit.energy]);
      setMinAndMax([typedHabit.minTime, typedHabit.maxTime]);
      setSelectedIndexes(
        typedHabit.timesOfDay.map((timeOfDay) =>
          TIMES_OF_DAY.indexOf(timeOfDay)
        )
      );
      setSelectedTags(typedHabit.tags);
    }
  }, []);

  const userId = useUserId();
  const userToken = useUserToken();

  function buildAndRegisterHabit() {
    const timesOfDay = TIMES_OF_DAY.filter((_, index) =>
      selectedIndexes.includes(index)
    );
    let newHabit: Habit = new HabitBuilder()
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

    if (isEditMode) {
      newHabit.setId(typedHabit.id);
      updateHabit(newHabit, userToken);
      onUpdate();
    } else {
      persistHabit(newHabit, userToken);
      onAdd();
    }

    navigation.navigate("HabitList");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? "Edit" : "Add new"} habit
      </Text>
      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <MaterialIcons name="title" size={24} color={secondaryColor} />
          Title
        </Text>
        <TextInput
          placeholder="Habit name"
          onChangeText={(text) => {
            setName(text);
          }}
          style={styles.textInput}
          value={name}
        />
      </View>

      <View style={styles.formLine}>

        <Text style={styles.formLineText}>
          <MaterialIcons name="priority-high" size={24} color={secondaryColor} />
          Habit importance</Text>
        <AirbnbRating
          count={3}
          defaultRating={benefit[0]}
          size={20}
          onFinishRating={(rating) => {
            setBenefit([rating]);
          }}
          showRating={false}
        />
      </View>

      <View style={styles.formLine}>
        <Text style={{fontSize: 18}}>
        <SimpleLineIcons name="energy" size={24} color={secondaryColor} />
          Energy requirement</Text>
        <View style={{ flexDirection: "column", width: '20%', alignItems: "center"}}>
          <MultiSlider
            values={energy}
            min={0}
            max={3}
            onValuesChange={(values) => setEnergy(values)}
            sliderLength={60}
            step={0.1}
            
          />
          <Text style={{ fontSize: 15 }}>
            {Math.round((energy[0] * 100) / 3)} %
          </Text>
        </View>
      </View>

      <View style={styles.formLine} >
      <Text style={styles.formLineText}>
      <AntDesign name="clockcircle" size={20} color={secondaryColor} />
        Min & max times</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
      <TextInput
          onChangeText={(text) => {
            setMinAndMax([+text, minAndMax[1]]);
          }}
          style={styles.textInput}
          value={minAndMax[0].toString()}
        />
        <Text> to </Text> 
        <TextInput
          onChangeText={(text) => {
            setMinAndMax([minAndMax[0], +text]);
          }}
          style={styles.textInput}
          value={minAndMax[1].toString()}
        />
        <Text> minutes.</Text> 
      </View>
      </View>

      <Text style={{ fontSize: 20 }}>Time of the day</Text>
      <ButtonGroup
        buttons={TIMES_OF_DAY}
        selectMultiple
        selectedIndexes={selectedIndexes}
        onPress={(value) => {
          setSelectedIndexes(value);
        }}
        containerStyle={{ marginBottom: 20}}
      />

      {/* Display chips for tags */}
      <Text style={{ fontSize: 20 }}>#tags</Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          margin: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tags.map((tag) => (
          <SelectChip
            label={tag}
            key={tag}
            onPress={() => {
              toggleTagSelection(tag);
            }}
            selected={selectedTags.includes(tag)}
          />
        ))}

        <TextInput
          placeholder="New tag"
          onChangeText={(text) => {
            setNewTag(text);
          }}
          style={styles.textInput}
        />
        <Button title="Add tag" onPress={onAddTag} style={{ maxHeight: 40 }} />
      </View>

      <ScrollView keyboardDismissMode="none">
        <Button
          onPress={buildAndRegisterHabit}
          title={"Save habit"}
          buttonStyle={styles.button}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin:5
  },
  formLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10,
    marginHorizontal: 5
  },
  formLineText: {
    fontSize: 18
  },
  textInput: {
    height: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 8,
    borderColor: "#eee",
    fontWeight: "bold"
  },
  button: {
    marginHorizontal: 10,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    bottom: 20,
  },
});
