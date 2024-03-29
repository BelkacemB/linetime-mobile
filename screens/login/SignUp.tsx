import { Input } from "@rneui/themed";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, TouchableOpacity, View } from "../../components/Themed";
import { auth } from "../../firebase";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      {/* Sign up by email and password using firebase */}
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text>Already have an account? </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>Sign in</Text>
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
