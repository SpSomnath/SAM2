import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
type ItemDetails = {
  id: string;
  name: string;
  location: string;
  status: string;
};

export default function Item({ details}: { details: ItemDetails }) {
  // console.log('item page',details)
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        padding: 16,
        margin: 15,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      }}>
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/src/screens/Device/DeviceDetail",
            params: {
              id: details.id,
              name: details.name,
              location: details.location,
              status: details.status,
            },
          });
        }}
        style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 2 }}>
          {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
        </Text>
        <Text style={{ color: "#6B7280", fontSize: 14 }}>
          {details.location.charAt(0).toUpperCase() +
            details.location.slice(1)}
        </Text>
      </Pressable>
      <Text
        style={{
          color: details.status === "active" ? "#10B981" : "#F59E42",
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: 12,
        }}>
        {details.status.charAt(0).toUpperCase() + details.status.slice(1)}
      </Text>
    </Pressable>
  );
}
