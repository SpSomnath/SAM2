import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Item from "@/components/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../CustomHeader";
import useGlobal from "@/core/global";




export default function AbortedDevice() {
  const devices = useGlobal((state) => state.devices)
  return (
    <SafeAreaView>
      <CustomHeader title="Abort Device" />

      <ScrollView>
        {devices.map((device) => (
          // <DeviceCard/>
          <Item key={device.id} details={device} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

