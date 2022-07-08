import React from "react";

import { Input } from "@rneui/themed";
import { Button, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { secondaryColor } from "../../constants/Colors";

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
      <Text>Login</Text>
      {/* Login by email and password using firebase */}
      <Input
        label="Email"
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        label="Password"
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button onPress={handleLogin} title="Login" />
      <Text>Don't have an account? </Text>
      <Button
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        title="Sign Up"
      />
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
});
