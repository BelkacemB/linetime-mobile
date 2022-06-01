import React from "react";

import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "../../components/Themed";

import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        mode="outlined"
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text>Don't have an account? </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
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
