import React from "react";
import { Chip } from "@rneui/base";
import { Text, StyleSheet } from "react-native";
import { secondaryColor } from "../constants/Colors";

type SelectChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'white',
    color: 'black',
    margin: 1
  },
  selected: { 
    backgroundColor: secondaryColor,
    color: 'white',
    margin: 1
  }
})

export const SelectChip = ({ label, selected, onPress }: SelectChipProps) => {
  return (
    <Chip
      onPress={onPress}
      buttonStyle={selected ? styles.selected : styles.default}
    >
      <Text style={{ color: selected ? "white" : "black" }}>{label}</Text>
    </Chip>
  );
};
