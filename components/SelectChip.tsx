import React from "react";
import { Chip } from "@rneui/base";
import { Text, View } from "react-native";

type SelectChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const SelectChip = ({ label, selected, onPress }: SelectChipProps) => {
  return (
    <Chip
      onPress={onPress}
      buttonStyle={{ maxHeight: 50, maxWidth: 100 }}
      type={selected ? "solid" : "outline"}
    >
      <Text style={{ color: selected ? "white" : "gray" }}>{label}</Text>
    </Chip>
  );
};
