import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import "./src/core/fontawosome";

import CustomHeader from "@/screens/CustomHeader";
import HomeScreen from "@/screens/Home";
import FontLoader from "@/core/fonts"; // adjust path as needed
import SignIn from "@/screens/Auth/SignIn";
import SignUp from "@/screens/Auth/SignUp";
import useGlobal from "@/core/global";
import { useEffect } from "react";
import Colors from "@/constants/colors";

export default function Index() {
  // const authenticated = false

  const initalized = useGlobal((state) => state.authenticated);
  const init = useGlobal((state) => state.init);
  const authenticated = useGlobal((state) => state.authenticated);

  useEffect(() => {
    init();
  }, []);
  // console.log('initalized', initalized)


  return (
    <FontLoader>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Colors.background,
          // width: "100%",
        }}>
        {!authenticated ? (
          <>
            <SafeAreaView>
              <StatusBar style="auto" />
            </SafeAreaView>
            <SignIn />
          </>
        ) : (
          <>
            <SafeAreaView>
              <HomeScreen />
            </SafeAreaView>
          </>
        )}
      </View>
    </FontLoader>
  );
}
