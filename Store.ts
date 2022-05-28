import React from "react";

export const HabitContext = React.createContext(null);

export const habitReducer = (state, action) => {
    switch (action.type) {
        case "ADD_HABIT":
            return [...state, action.payload];
        case "REMOVE_HABIT":
            return state.filter(habit => habit.id !== action.payload);
        default:
            return state;
    }
}