import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import { AirbnbRating, Button, ButtonGroup } from "@rneui/base";
import { persistHabit, updateHabit } from "../../api/HabitService";

import { Text, View } from "../../components/Themed";

import {
  AntDesign,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { SelectChip } from "../../components/SelectChip";
import { primaryColor, secondaryColor } from "../../constants/Colors";
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
      setSelectedTags(typedHabit.tags ?? []);
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
      .setCreationDate(isEditMode ? typedHabit.creationDate : new Date())
      .setLastDone(isEditMode ? typedHabit.lastDone : new Date())
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

  const setMin = (min: string) => {
    if (isNaN(Number(min))) {
      return;
    }
    setMinAndMax([parseInt(min, 10), minAndMax[1]]);
  };

  const setMax = (max: string) => {
    if (isNaN(Number(max))) {
      return;
    }
    setMinAndMax([minAndMax[0], parseInt(max, 10)]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
            step={0.1}
            selectedStyle={{ backgroundColor: secondaryColor }}
          />
          <Text style={{ fontSize: 15 }}>
            {Math.round((energy[0] * 100) / 3)} %
          </Text>
        </View>
      </View>

      <View style={styles.formLine}>
        <Text style={styles.formLineText}>
          <AntDesign name="clockcircle" size={20} color={secondaryColor} />
          Min & max times
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <TextInput
            onChangeText={setMin}
            style={styles.textInput}
            value={minAndMax[0].toString()}
          />
          <Text> to </Text>
          <TextInput
            onChangeText={setMax}
            style={styles.textInput}
            value={minAndMax[1].toString()}
          />
          <Text> minutes</Text>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor={primaryColor}
        darkColor="rgba(255,255,255,0.1)"
      />
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
        contentContainerStyle={{ justifyContent: "flex-end" }}
      >
        <Button
          onPress={buildAndRegisterHabit}
          title={"Save"}
          buttonStyle={styles.button}
        />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { 
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
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
  },
  button: {
    backgroundColor: secondaryColor,
    marginHorizontal: 10,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    bottom: 20,
  },
  separator: {
    backgroundColor: secondaryColor,
    marginVertical: 15,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
});
