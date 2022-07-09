import React from "react";

import { Input, Image } from "@rneui/base";
import { Button, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "../../components/Themed";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { secondaryColor } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const errorCodeToMessage = {
  "auth/invalid-email": "Invalid email address",
  "auth/user-disabled": "User disabled",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Wrong password",
};

export const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const message = errorCodeToMessage[error.code] || error.message;
      setError(message);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/compact-cassette.png")}
          style={{ width: 200, height: 150 }}
        />
      </View>

      <Text style={styles.logoText}>linetime</Text>
      {/* Login by email and password using firebase */}
      <Input
        label="Email"
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        label="Password"
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
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
      >
        <AntDesign name="form" size={24} color="black" />
        <Text style={{ fontSize: 16, marginVertical: 5 }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
