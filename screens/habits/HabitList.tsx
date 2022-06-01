import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { HabitElement } from "../../components/HabitElement";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import { useList } from "react-firebase-hooks/database";

import { getUserDBRef } from "../../api/HabitService";
import useUserId from "../../hooks/useUserId";

export const HabitList = ({ navigation }) => {
  const userId = useUserId();

  const [snapshots, loading, error] = useList(getUserDBRef(userId));

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}

      <FlatList
        data={snapshots}
        renderItem={({ item }) => (
          <HabitElement habit={item.val()} navigation={navigation} />
        )}
        keyExtractor={(item) => item.key}
      />
      {/* Add a new habit */}
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddHabit");
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            ➕ Add new habit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
});
