import React from "react";

export const HabitContext = React.createContext(null);

export const habitReducer = (state, action) => {
    switch (action.type) {
        case "ADD_HABIT":
            // Update state.habits
            console.log(`Adding habit: ${action.payload.name}`);
            return {
                ...state,
                habits: [...state.habits, action.payload]
            };
        case "REMOVE_HABIT":
            // Remove habit from state.habits
            return {
                ...state,
                habits: state.habits.filter(
                    habit => habit.id !== action.payload
                )
            };
        case "UPDATE_HABIT":
            // Update habit in state.habits
            return {
                ...state,
                habits: state.habits.map(habit => {
                    if (habit.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return habit;
                    }
                })
            };
        default:
            return state;
    }
}