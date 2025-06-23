import {
  View,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/Input";
import Button from "@/components/Button";
import api from "@/core/api";
import utils from "@/core/utils";
import useGlobal from "@/core/global";

export default function SignInScreen() {
  const login = useGlobal((state) => state.login);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username && !password) {
      setError("Username and Password are required");
      return;
    } else if (!username) {
      setError("Username is required");
      return;
    } else if (username.length < 3) {
      setError("Invalid username, must be at least 3 characters long");
      return;
    } else if (!password) {
      setError("Password is required");
      return;
    } else if (password.length < 8) {
      setError("Invalid Password, must be at least 8 characters long");
      return;
    }

    setError("");

    // Make Signin request

    api({
      method: "POST",
      url: "/automation/signin/",
      data: {
        username: username,
        password: password,
      },
    })
      .then((response) => {
        const credentials = {
          username: username,
          password: password,
        };
        utils.log("signin: ", response.data);
        login(credentials, response.data.user, response.data.tokens);
      })
      .catch((error) => {
        setError("User not found please Sign Up");
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
        style={{
          flex: 1,
          width: "100%",
          // alignContent: 'center',
          // alignItems: 'center'
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}>
        <SafeAreaView
          style={{
            // marginTop: 0,
            // flex: 1,
            alignItems: "center",
            width: "100%",
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
            {error ? (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}>
                {error}
              </Text>
            ) : null}

            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins-Medium",
                marginBottom: 10,
              }}>
              Sign In
            </Text>
            <Input
              title="Username"
              value={username}
              setValue={setUserName}
              autoCapitalize="none"
            />
            <Input
              title="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              autoComplete="off"
              autoCapitalize="none"
            />
            <Button title="Sign In" onPress={handleLogin} />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Don't have an account?</Text>
            <Link
              style={{ color: "blue", marginLeft: 5 }}
              href="/src/screens/Auth/SignUp">
              Sign Up
            </Link>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
