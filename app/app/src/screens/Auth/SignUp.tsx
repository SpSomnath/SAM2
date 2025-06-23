import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/Input";
import Button from "@/components/Button";
import api from "@/core/api";
import utils from "@/core/utils";
import useGlobal from "@/core/global";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const login = useGlobal((state) => state.login);

  const handleSignup = () => {
    if (!username && !password1) {
      setError("Username and Password are required");
      return;
    } else if (!firstName) {
      setError("First Name is required");
      return;
    } else if (!lastName) {
      setError("Last Name is required");
      return;
    } else if (!username) {
      setError("Username is required");
      return;
    } else if (username.length < 3) {
      setError("Invalid username, must be at least 3 characters long");
      return;
    } else if (!email) {
      setError("Email is required");
      return;
    } else if (!password1) {
      setError("Password is required");
      return;
    } else if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    } else if (password1.length < 8) {
      setError("Invalid Password, must be at least 8 characters long");
      return;
    }
    setError("");

    // handle  signup here
    api({
      method: "POST",
      url: "/automation/signup/",
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password1,
      },
    })
      .then((response) => {
        const credentials = {
          username: username,
          password: password1,
        };
        utils.log("signin: ", response.data);
        login(credentials, response.data.user, response.data.tokens);
        router.replace('/')
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}>
        <SafeAreaView
          style={{
            marginTop: 0,
            paddingTop: 40,
            flex: 1,
            alignItems: "center",
            width: "100%",
            backgroundColor: "#fff",
          }}>
          <Image
            source={require("../../assets/images/sam2-logo.png")}
            style={{ width: 120, height: 120, marginBottom: 24 }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: 35,
              fontFamily: "Poppins-Bold",
              marginBottom: 30,
            }}>
            SAM2
          </Text>
          <View
            style={{
              width: "90%",
              maxWidth: 350,
              alignSelf: "center",
            }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins-Medium",
                marginBottom: 10,
              }}>
              Sign Up
            </Text>

            {error ? (
              <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
            ) : null}

            <Input
              title="Username"
              value={username}
              setValue={setUsername}
              autoComplete="off"
              autoCapitalize="none"
            />
            <Input
              title="First Name"
              value={firstName}
              setValue={setFirstName}
            />
            <Input title="Last Name" value={lastName} setValue={setLastName} />
            <Input
              title="Email"
              value={email}
              setValue={setEmail}
              autoCapitalize="none"
            />
            <Input
              title="Password"
              value={password1}
              setValue={setPassword1}
              secureTextEntry={true}
              autoComplete="off"
              autoCapitalize="none"
            />
            <Input
              title="Confirm Password"
              value={password2}
              setValue={setPassword2}
              secureTextEntry={true}
              autoComplete="off"
              autoCapitalize="none"
            />
            <Button title="Sign Up" onPress={handleSignup} />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
            }}>
            <Text>Already have an account? </Text>
            <Pressable onPress={() => router.back()}>
              <Text style={{ color: "blue" }}>Sign In</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
