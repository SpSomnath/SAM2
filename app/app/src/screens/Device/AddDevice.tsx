import { Pressable, Text, TextInput, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useGlobal from "@/core/global";

function Header() {
  const router = useRouter();
  return (
    <View
      style={{
        height: 60,
        backgroundColor: Colors.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        elevation: 4,
      }}>
      <Pressable onPress={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} />
      </Pressable>
      <Text style={{ fontSize: 18, fontFamily: "Poppins-Medium" }}>
        Add Device
      </Text>
      <View style={{ width: 20 }} />
    </View>
  );
}

export default function AddDevice() {
  const [deviceId, setDeviceId] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [location, setLocation] = useState("");

  const sendDevice = useGlobal((state) => state.newDevice); // use the correct function name
  const user = useGlobal((state) => state.user);

  const router = useRouter();

  const handleSubmit = () => {
    // Validate input
    if (!deviceId || !deviceName || !location) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    } else {
      const deviceObj = {
        device_id: deviceId,
        device_name: deviceName,
        location: location,
      };
      sendDevice(deviceObj); // use the correct function
    }

    // Create device object (remove status)
    const newDevice = {
      device_id: deviceId,
      device_name: deviceName,
      location: location,
    };

    // Here you would typically send the newDevice object to your backend API
    console.log("Device added:", newDevice);

    // Navigate back or show success message
    Alert.alert("Success", "Device added successfully!");
    router.back(); // Navigate back to the previous screen
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Header />
      <View style={{ marginTop: 20 }}>
        {/* Device ID Section */}
        <Text style={{ fontSize: 18 }}>Device ID:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginTop: 5,
          }}
          value={deviceId}
          onChangeText={setDeviceId}
        />

        {/* Device Name Section */}
        <Text style={{ fontSize: 18, marginTop: 20 }}>Device Name:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginTop: 5,
          }}
          value={deviceName}
          onChangeText={setDeviceName}
        />

        <Text style={{ fontSize: 18, marginTop: 20 }}>Location:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginTop: 5,
          }}
          value={location}
          onChangeText={setLocation}
        />

        <Pressable
          onPress={handleSubmit}
          style={{
            backgroundColor: "#007BFF",
            padding: 15,
            borderRadius: 5,
            marginTop: 20,
            alignItems: "center",
          }}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Add Device</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
