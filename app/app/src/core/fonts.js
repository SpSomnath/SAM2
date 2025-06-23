import React from "react";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return children;
}
