import React from "react";
import { Suggestion } from "../model/LinetimeTypes";

import { Text } from "./Themed";
import { View } from "react-native";
import Feather from "@expo/vector-icons/build/Feather";
import { secondaryColor, tertiaryColor } from "../constants/Colors";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

type Props = {
  suggestion: Suggestion;
  onRejectOrAccept: (Suggestion) => void;
};

export const SuggestionElement = ({ suggestion, onRejectOrAccept }: Props) => {
  return (
    <View>
      <LinearGradient
        colors={[tertiaryColor, secondaryColor, tertiaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ width: "100%" }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 3,
            paddingVertical: 10,
            backgroundColor: "white",
          }}
        >
          <Entypo name="chevron-small-left" size={24} />

          <View
            style={{
              flexDirection: "row",
              width: "60%",
              justifyContent: "center",
            }}
          >
            <Feather name="activity" size={24} color="black" />
            <Text style={{ fontSize: 20 }}> {suggestion.name}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Ionicons name="time-outline" size={24} color="black" />
            <Text style={{ fontSize: 20 }}>
              {" "}
              {suggestion.suggestedTime} min
            </Text>
            <Entypo name="chevron-small-right" size={24} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
