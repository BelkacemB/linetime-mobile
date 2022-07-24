import { Dialog } from "@rneui/base";
import React from "react";
import Habit from "../../model/Habit";
import { Text, View } from "../../components/Themed";
import { TextInput } from "react-native";

type Props = {
  habit: Habit;
  onConfirmCheckIn: (Habit) => void;
  onCancel: (Habit) => void;
  onChangeNote: (string) => void;
  visible: boolean;
};

export const ConfirmCheckIn = ({
  habit,
  onConfirmCheckIn,
  onChangeNote,
  onCancel,
  visible,
}: Props) => {
  return (
    <Dialog
      isVisible={visible}
      overlayStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "white" }}
    >
      <Dialog.Title>Confirm Check In</Dialog.Title>

      <Text>
        Do you want to check in and mark "{habit?.name}" as done for today?
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text>Note:</Text>
        <TextInput
          style={{
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            padding: 5,
            marginLeft: 10,
            width: "80%",
          }}
          onChangeText={onChangeNote}
        />
      </View>

      <Dialog.Actions>
        <Dialog.Button title="Yes" onPress={() => onConfirmCheckIn(habit)} />
        <Dialog.Button title="No" onPress={onCancel} />
      </Dialog.Actions>
    </Dialog>
  );
};
