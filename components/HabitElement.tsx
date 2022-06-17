import React from "react";
import Habit from "../model/Habit";
import { deleteHabit } from "../api/HabitService";
import useUserToken from "../hooks/useUserToken";
import { Button, ListItem } from "@rneui/base";

type HabitProps = {
  habit: Habit;
  navigation: any;
  onUpdateOrDelete: () => void;
};

export const HabitElement = ({
  habit,
  navigation,
  onUpdateOrDelete,
}: HabitProps) => {
  const userToken = useUserToken();

  const edit = () => {
    navigation.navigate("AddEditHabit", {
      habit: habit,
      onUpdate: onUpdateOrDelete,
    });
  };

  function remove() {
    deleteHabit(habit, userToken);
    onUpdateOrDelete();
  }

  return (
    <ListItem.Swipeable
      leftContent={ (reset) => 
        <Button
          title="Edit"
          onPress={() => {
            reset();
            edit();}
          }
          icon={{ name: 'settings', color: 'white' }}
          buttonStyle={{ minHeight: '100%' }}
        />
      }
      rightContent={(reset) => 
        <Button
          title="Delete"
          onPress={() => {
            reset();
            remove();
            }
          }
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      }
    >
      <ListItem.Content>
        <ListItem.Title>{habit.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};
