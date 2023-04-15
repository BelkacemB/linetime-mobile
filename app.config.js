module.exports = {
  expo: {
    name: "linetime-mobile",
    slug: "linetime-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "linetime",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.belkacem_b.linetimemobile",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    sdkVersion: "48.0.0",
    extra: {
      apiUrl:
        process.env.API_URL ||
        "https://t4fy8hulxb.execute-api.us-east-2.amazonaws.com/prod",
    },
  },
  name: "linetime-mobile",
};
