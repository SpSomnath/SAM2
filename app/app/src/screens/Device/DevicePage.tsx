import React from "react";
import { View, ScrollView, Text, SafeAreaView } from "react-native";
import CustomHeader from "../CustomHeader";
import useGlobal from "@/core/global";
import Item from "@/components/Item";
import { useLocalSearchParams, useRouter } from "expo-router";

const DevicePage = () => {
  const devices = useGlobal((state) => state.devices);
  const router = useRouter();
  const { filter, title } = useLocalSearchParams<{
    filter: string;
    title:string
  }>();

  // Filter devices based on the filter parameter
  const filteredDevices = devices.filter((device) => {
    switch (filter) {
      case "active":
        return device.status === "active";
      case "inactive":
        return device.status === "inactive";
      case "abort":
        return device.status === "abort";
      default:
        return true;
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title={title} />

      <ScrollView>
        {Array.isArray(filteredDevices) && filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <View key={device.id}>
              <Item
                details={{
                  id: device.id,
                  name: device.name,
                  location: device.location,
                  status: device.status,
                }}
              />
            </View>
          ))
        ) : (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "gray" }}>
              No devices available.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles as constants for better readability

export default DevicePage;
