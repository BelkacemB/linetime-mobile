import React from "react";

import { Input, Image } from "@rneui/base";
import { ScrollView, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "../../components/Themed";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { secondaryColor } from "../../constants/Colors";
import { AntDesign, Entypo } from "@expo/vector-icons";

const errorCodeToMessage = {
  "auth/invalid-email": "Invalid email address",
  "auth/user-disabled": "User disabled",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Wrong password",
};

export const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const message = errorCodeToMessage[error.code] || error.message;
      setError(message);
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Image
          source={require("../../assets/images/compact-cassette.png")}
          style={{ width: 200, height: 150 }}
        />
      </View>

      <Text style={styles.logoText}>LineTime</Text>
      <View
        style={styles.separator}
        lightColor="#636e72"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* Login by email and password using firebase */}
      <Input
        label="Email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        label="Password"
        onChangeText={setPassword}
        secureTextEntry={passwordVisible}
        style={styles.input}
        rightIcon={
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Entypo name={passwordVisible ? "eye" : "eye-with-line"} size={24} />
          </TouchableOpacity>
        }
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <AntDesign name="login" size={24} color="black" />
        <Text style={{ fontSize: 16, marginVertical: 5 }}>Login</Text>
      </TouchableOpacity>
      <Text>Don't have an account? </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        style={styles.button}
        disabled
      >
        <AntDesign name="form" size={24} color="black" />
        <Text style={{ fontSize: 16, marginVertical: 5 }}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 55,
    backgroundColor: secondaryColor,
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexGrow: 1,
  },
  button: {
    marginVertical: 20,
    backgroundColor: "white",
    shadowOpacity: 0.3,
    borderWidth: 0.1,
    borderRadius: 10,
    padding: 10,
    width: "35%",
    alignItems: "center",
    shadowColor: "#000",
  },
  logoText: {
    fontSize: 35,
    fontVariant: ["small-caps"],
    marginVertical: 10,
    color: secondaryColor,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
    opacity: 0.2,
  },
});
