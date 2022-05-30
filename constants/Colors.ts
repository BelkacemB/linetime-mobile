const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const primaryColor: string = "rgba(5, 5, 5, 1)";
export const secondaryColor: string = "rgba(27, 154, 170, 1)";
export const transparentSecondaryColor: string = "rgba(27, 154, 170, 0.3)";
export const tertiaryColor: string = "rgba(221, 219, 203, 0.3)";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
