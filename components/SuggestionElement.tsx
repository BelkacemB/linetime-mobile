import React from "react";
import { transparentSecondaryColor } from "../constants/Colors";
import { Suggestion } from "../model/LinetimeTypes";

import { View, Text } from "./Themed";
import { TouchableOpacity } from "./Themed";

type Props = {
  suggestion: Suggestion;
};

export const SuggestionElement = ({ suggestion }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        padding: 5,
        borderBottomWidth: 1,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {suggestion.name}
      </Text>
      <Text> for </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {suggestion.suggestedTime}
      </Text>
      <Text> minutes 🕒 </Text>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: transparentSecondaryColor,
          padding: 10,
          marginLeft: 20,
        }}
      >
        <Text>✅</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: transparentSecondaryColor,
          padding: 10,
        }}
      >
        <Text>❌</Text>
      </TouchableOpacity>
    </View>
  );
};
