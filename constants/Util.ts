// Method to get time of day ('morning', 'afternoon', 'evening') based on local time
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'morning';
    } else if (hour < 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
    }

export const getDefaultEnergyLevel = (): number => {
    const timeOfDay = getTimeOfDay();
    if (timeOfDay === 'morning') {
        return 6;
    } else if (timeOfDay === 'afternoon') {
        return 3;
    } else {
        return 2;
    }
}
