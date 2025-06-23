import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

type ItemDetails = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export default function Item({
  details,
  onDelete,
}: {
  details: ItemDetails;
  onDelete?: (id: number) => void;
}) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/src/screens/Device/DeviceDetail",
          params: {
            id: details.id.toString(),
            title: details.title,
            description: details.description,
            status: details.status,
          },
        })
      }
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
        justifyContent: "space-between",
      }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 2 }}>
          {details.title.charAt(0).toUpperCase() + details.title.slice(1)}
        </Text>
        <Text style={{ color: "#6B7280", fontSize: 14 }}>
          {details.description.charAt(0).toUpperCase() +
            details.description.slice(1)}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            color: details.status === "active" ? "#10B981" : "#F59E42",
            fontWeight: "bold",
            fontSize: 16,
          }}>
          {details.status.charAt(0).toUpperCase() + details.status.slice(1)}
        </Text>
        {onDelete && (
          <Pressable
            onPress={() => onDelete(details.id)}
            style={{ marginTop: 4 }}>
            <Text style={{ color: "red", fontSize: 12 }}>Delete</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}
