import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import { persistHabit, updateHabit } from "../../api/HabitService";
import { ButtonGroup, Button, AirbnbRating } from "@rneui/base";

import { View, Text } from "../../components/Themed";

import Habit, { HabitBuilder } from "../../model/Habit";
import { TIMES_OF_DAY } from "../../model/constants";
import useUserId from "../../hooks/useUserId";
import useUserToken from "../../hooks/useUserToken";
import useHabitTags from "../../hooks/useHabitTags";
import { SelectChip } from "../../components/SelectChip";

export const AddEditHabit = ({ navigation, route }) => {
    const { onAdd, onUpdate, habit} = route.params;
    const typedHabit: Habit = habit as Habit;
    const isEditMode = typedHabit !== undefined;

    // Activity
    const [name, setName] = React.useState("");
    const [benefit, setBenefit] = React.useState<number[]>([0]);
    const [energy, setEnergy] = React.useState<number[]>([0]);
    const [minAndMax, setMinAndMax] = React.useState<number[]>([5, 15]);
    const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>([
        0, 1, 2,
    ]);

    const { tags, selectedTags, setSelectedTags, setNewTag, onAddTag, toggleTagSelection } =
        useHabitTags();

        // Initialize state in edit mode
        useEffect(() => {
            if (isEditMode) {
                setName(typedHabit.name);
                setBenefit([typedHabit.benefits]);
                setEnergy([typedHabit.energy]);
                setMinAndMax([typedHabit.minTime, typedHabit.maxTime]);
                setSelectedIndexes(
                    typedHabit.timesOfDay.map((timeOfDay) =>
                        TIMES_OF_DAY.indexOf(timeOfDay)
                    )
                );
                setSelectedTags(typedHabit.tags);
            }
        }, [isEditMode]);

    const userId = useUserId();
    const userToken = useUserToken();

    function buildAndRegisterHabit() {
        // Get times of day from selectedIndexes
        const timesOfDay = TIMES_OF_DAY.filter((_, index) =>
            selectedIndexes.includes(index)
        );
        let newHabit: Habit = new HabitBuilder()
            .setName(name)
            .setBenefits(benefit[0])
            .setEnergy(energy[0])
            .setMinTime(minAndMax[0])
            .setMaxTime(minAndMax[1])
            .setUserId(userId)
            .setTags(selectedTags)
            .setTimesOfDay(timesOfDay)
            .setCreationDate(new Date())
            .setLastDone(new Date())
            .build();

        if (isEditMode) {
            newHabit.setId(typedHabit.id)
            updateHabit(newHabit, userToken);
            onUpdate();
        } else {
            persistHabit(newHabit, userToken)
            onAdd();
        }

        navigation.navigate("HabitList");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isEditMode ? "Edit ": "Add new "} habit</Text>
            <TextInput
                placeholder="Habit name"
                onChangeText={(text) => {
                    setName(text);
                }}
                style={styles.textInput}
                value={name}
            />
            <Text style={{ fontSize: 20 }}>How important is this habit to you?</Text>
            <AirbnbRating
                count={5}
                defaultRating={benefit[0] * 5/3}
                size={20}
                onFinishRating={(rating) => {
                    setBenefit([(rating * 3) / 5]);
                }}
                reviews={[
                    "Don't care",
                    "Not important",
                    "Moderately important",
                    "Important",
                    "Cornerstone habit",
                ]}
            />

            <Text style={{ fontSize: 20 }}>Energy requirement:</Text>
            <View style={{ flexDirection: "row" }}>
                <MultiSlider
                    values={energy}
                    min={0}
                    max={3}
                    onValuesChange={(values) => setEnergy(values)}
                    sliderLength={150}
                    step={0.1}
                />
                <Text style={{ fontSize: 20 }}>
                    {Math.round((energy[0] * 100) / 3)} %
                </Text>
            </View>

            <Text style={{ fontSize: 20 }}>Min and max times</Text>
            <View style={{ flexDirection: "row" }}>
                <MultiSlider
                    values={minAndMax}
                    min={5}
                    max={120}
                    onValuesChange={(values) => setMinAndMax(values)}
                    step={1}
                    sliderLength={150}
                />
                <Text style={{ fontSize: 20 }}>
                    From {Math.round(minAndMax[0])} to {Math.round(minAndMax[1])} minutes
                </Text>
            </View>

            <Text style={{ fontSize: 20 }}>Time of the day</Text>
            <ButtonGroup
                buttons={TIMES_OF_DAY}
                selectMultiple
                selectedIndexes={selectedIndexes}
                onPress={(value) => {
                    setSelectedIndexes(value);
                }}
                containerStyle={{ marginBottom: 20 }}
            />

            {/* Display chips for tags */}
            <Text style={{ fontSize: 20 }}>#tags</Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {tags.map((tag) => (
                    <SelectChip
                        label={tag}
                        key={tag}
                        onPress={() => {
                            toggleTagSelection(tag);
                        }}
                        selected={selectedTags.includes(tag)}
                    />
                ))}

                <TextInput
                    placeholder="New tag"
                    onChangeText={(text) => {
                        setNewTag(text);
                    }}
                    style={styles.textInput}
                />
                <Button title="Add tag" onPress={onAddTag} style={{ maxHeight: 40 }} />
            </View>

            <ScrollView keyboardDismissMode="none">
                <Button
                    onPress={buildAndRegisterHabit}
                    title={"Save habit"}
                    buttonStyle={styles.button}
                />
            </ScrollView>
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
        width: "20%",
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#eee",
    },
    button: {
        marginHorizontal: 10,
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        bottom: 20,
    },
});