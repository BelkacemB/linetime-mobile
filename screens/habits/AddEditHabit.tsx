import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import { AirbnbRating, Button, ButtonGroup, Dialog } from "@rneui/base";

import { Text, View } from "../../components/Themed";

import {
  AntDesign,
  Entypo,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import SelectChip from "../../components/SelectChip";
import { primaryColor, secondaryColor } from "../../constants/Colors";
import useHabitTags from "../../hooks/useHabitTags";
import { TIMES_OF_DAY } from "../../model/constants";
import Habit, { HabitBuilder } from "../../model/Habit";
import { AppContext } from "../../model/Store";

export const AddEditHabit = ({ navigation, route }) => {
  // Get habit from route params if it exists
  const habit = route.params?.habit ?? undefined;

  const {
    state: { habits, userId },
    dispatch,
  } = useContext(AppContext);
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

  const [error, setError] = React.useState<string | undefined>();

  const {
    tags,
    selectedTags,
    setSelectedTags,
    setNewTag,
    onAddTag,
    toggleTagSelection,
  } = useHabitTags(habits);

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
      setSelectedTags(typedHabit.tags ?? []);
    }
  }, []);

  function buildAndRegisterHabit() {
    // If name is empty, show Dialog with error message
    if (name === "") {
      setError("Please enter a name for your habit.");
      return;
    }

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
      .setCreationDate(isEditMode ? typedHabit.creationDate : new Date())
      .setClockInTimes(isEditMode ? typedHabit.clockInTimes : [])
      .build();

    if (isEditMode) {
      newHabit.setId(typedHabit.id);
      dispatch({ type: "UPDATE_HABIT", habit: newHabit });
    } else {
      newHabit.lastDone = new Date();
      dispatch({ type: "ADD_HABIT", habit: newHabit });
    }

    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Dialog
        isVisible={error !== undefined}
        onBackdropPress={() => setError(undefined)}
        overlayStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: "white" }}
      >
        <Dialog.Title title="Missing information" />
        <Text>{error}</Text>
      </Dialog>

      <Text style={styles.title}>{isEditMode ? "Edit" : "Add new"} habit</Text>
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
          <MaterialIcons
            name="priority-high"
            size={24}
            color={secondaryColor}
          />
          Habit importance
        </Text>
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
        <Text style={{ fontSize: 18 }}>
          <SimpleLineIcons name="energy" size={24} color={secondaryColor} />
          Energy requirement
        </Text>
        <View
          style={{
            flexDirection: "column",
            width: "20%",
            alignItems: "center",
          }}
        >
          <MultiSlider
            values={energy}
            min={0}
            max={3}
            onValuesChange={(values) => setEnergy(values)}
            sliderLength={80}
            step={0.6}
            selectedStyle={{ backgroundColor: secondaryColor }}
          />
          <Text style={{ fontSize: 15 }}>
            {Math.round((energy[0] * 100) / 3)} %
          </Text>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor={primaryColor}
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Text style={styles.formLineText}>
          <AntDesign name="clockcircle" size={20} color={secondaryColor} />
          Min & max times
        </Text>
        <MultiSlider
          values={minAndMax}
          min={5}
          max={120}
          onValuesChange={(values) => setMinAndMax(values)}
          step={5}
          selectedStyle={{ backgroundColor: secondaryColor }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <Text style={{ fontSize: 20, flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{minAndMax[0]}</Text> minutes
          </Text>
          <Text style={{ fontSize: 20 }}>
            <Text style={{ fontWeight: "bold" }}>{minAndMax[1]}</Text> minutes
          </Text>
        </View>
      </View>

      <Text>{}</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.formLineText}>
          <Feather name="sun" size={24} color={secondaryColor} />
          Time of the day
        </Text>
      </View>
      <ButtonGroup
        buttons={TIMES_OF_DAY}
        selectMultiple
        selectedIndexes={selectedIndexes}
        onPress={(value) => {
          setSelectedIndexes(value);
        }}
        textStyle={{ color: "black" }}
        containerStyle={{
          backgroundColor: "white",
          borderColor: secondaryColor,
          borderWidth: 1,
        }}
        selectedButtonStyle={{ backgroundColor: secondaryColor }}
        selectedTextStyle={{ color: "white" }}
      />
      <View
        style={styles.separator}
        lightColor={primaryColor}
        darkColor="rgba(255,255,255,0.1)"
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
            label={tag.toLowerCase()}
            key={tag}
            onPress={() => {
              toggleTagSelection(tag);
            }}
            selected={selectedTags?.includes(tag)}
          />
        ))}

        <TextInput
          placeholder="New tag"
          onChangeText={(text) => {
            setNewTag(text);
          }}
          style={styles.textInput}
        />
        <AntDesign
          name="pluscircleo"
          size={20}
          color={secondaryColor}
          onPress={onAddTag}
        />
      </View>

      <ScrollView
        keyboardDismissMode="none"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          onPress={buildAndRegisterHabit}
          title={
            <Text style={{ fontSize: 16 }}>
              <Entypo name="save" size={16} color="black" /> Save
            </Text>
          }
          buttonStyle={{ backgroundColor: "white", ...styles.button }}
          color={secondaryColor}
          titleStyle={{ color: "black" }}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  formLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    width: "95%",
  },
  formLineText: {
    fontSize: 18,
    marginHorizontal: 2,
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
    fontWeight: "bold",
    minWidth: "15%",
  },
  button: {
    margin: 10,
    width: "80%",
    shadowOpacity: 0.2,
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
  },
  separator: {
    backgroundColor: secondaryColor,
    marginVertical: 15,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
});
