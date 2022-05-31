import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useContext } from "react";
import { StyleSheet, TextInput } from "react-native";

import { persistHabit } from "../../api/HabitService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

import { TouchableOpacity, View, Text } from "../../components/Themed";
import { transparentSecondaryColor } from "../../constants/Colors";

import Habit, { HabitBuilder } from "../../model/Habit";

export const AddHabit = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [benefit, setBenefit] = React.useState<number[]>([0]);
  const [fun, setFun] = React.useState<number[]>([0]);

  const [user] = useAuthState(auth);

  async function buildAndRegisterHabit() {
    let habit: Habit = new HabitBuilder()
      .setName(name)
      .setBenefits(benefit[0])
      .setFun(fun[0])
      .setUserId(user.uid)
      .build();

    await persistHabit(habit, user.uid);

    navigation.goBack();
  };

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
