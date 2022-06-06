import React from "react";
import { Chip } from "@rneui/base";
import { Text, View } from "react-native";

type SelectChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const SelectChip = ({ label, selected, onPress }: SelectChipProps) => {
  const [chipText, setChipText] = React.useState(label);

  return (
    <Chip
      onPress={onPress}
      style={{ marginRight: 8, elevation: selected ? 2 : 0 }}
    >
      <Text>{selected ? label + " ✔️" : label}</Text>
    </Chip>
  );
};
