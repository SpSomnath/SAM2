import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Item from "@/components/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../CustomHeader";
// import devices from "@/core/devices";
import useGlobal from "@/core/global";


const devices = useGlobal((state) => state.devices);



const DevicePage = () => {
  return (
    <SafeAreaView>
      <CustomHeader title="Devices" />

      <ScrollView>
        {devices.map((device) => (
          // <DeviceCard/>
          <Item key={device.id} details={device} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DevicePage;
