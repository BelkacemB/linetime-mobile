import { Dialog } from "@rneui/base";
import React from "react";
import Habit from "../../model/Habit";
import { Text } from "../../components/Themed";

type Props = {
  habit: Habit;
  onConfirmCheckIn: (Habit) => void;
  onCancel: (Habit) => void;
  visible: boolean;
};

export const ConfirmCheckIn = ({
  habit,
  onConfirmCheckIn,
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

      <Dialog.Actions>
        <Dialog.Button title="Yes" onPress={() => onConfirmCheckIn(habit)} />
        <Dialog.Button title="No" onPress={onCancel} />
      </Dialog.Actions>
    </Dialog>
  );
};
