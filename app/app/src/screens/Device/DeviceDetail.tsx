import { View, Text, Pressable, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
        Details
      </Text>
      <View style={{ width: 20 }} />
    </View>
  );
}

export default function DeviceDetail() {
  const { id, title, description, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>();

  // Dummy data for power usage over 24 hours
  const data = {
    labels: ["0h", "6h", "12h", "18h", "24h"],
    datasets: [
      {
        data: [20, 45, 28, 80, 70], // Example power usage data
        strokeWidth: 2,
      },
    ],
  };

  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f8fa" }}>
      <Header />
      <View
        style={{
          // margin: 16,
          flex:1,
          borderRadius: 18,
          backgroundColor: "#fff",
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 4,
        }}>
        {/* Device Name and Status */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}>
          <Text style={{ fontSize: 26, fontWeight: "600", flex: 1 }}>
            Light
          </Text>
          <View
            style={{
              backgroundColor: "#e7fbe9",
              borderRadius: 12,
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginLeft: 8,
            }}>
            <Text style={{ color: "#10B981", fontSize: 13, fontWeight: "500" }}>
              Connected
            </Text>
          </View>
        </View>
        {/* On/Off Toggle */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#f1f3f6",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}>
            {/* Icon placeholder */}
            <Text style={{ fontSize: 18 }}>💡</Text>
          </View>
          <Text style={{ fontSize: 18, fontWeight: "500", marginRight: 10 }}>
            {isEnabled ? 'On' : 'Off'}
          </Text>
          <Switch
            value={isEnabled}
            onValueChange={setIsEnabled}
            trackColor={{ false: "#e5e7eb", true: "#10B981" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
          />
        </View>
        {/* Power Usage */}
        <View
          style={{
            backgroundColor: "#f6f8fa",
            borderRadius: 12,
            padding: 12,
            marginBottom: 18,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}>
            <Text style={{ fontSize: 16, fontWeight: "500", flex: 1 }}>
              Power Usage
            </Text>
            <TouchableOpacity>
              <Text
                style={{ color: "#6b7280", fontSize: 13, fontWeight: "500" }}>
                24 H &gt;
              </Text>
            </TouchableOpacity>
          </View>
          <LineChart
            data={data}
            width={380}
            height={280}
            chartConfig={{
              backgroundColor: "#f6f8fa",
              backgroundGradientFrom: "#f6f8fa",
              backgroundGradientTo: "#f6f8fa",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 12,
              },
              propsForDots: {
                r: "0",
                strokeWidth: "2",
                stroke: "#10B981",
              },
            }}
            bezier
            style={{
              marginVertical: 4,
              borderRadius: 12,
            }}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={true}
          />
        </View>
        {/* Actions */}
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          Actions
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: 10,
            paddingVertical: 16,
            alignItems: "center",
            marginBottom: 10,
          }}>
          <Text style={{ color: "#2563eb", fontWeight: "700", fontSize: 16 }}>
            Set Alert
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: 10,
            paddingVertical: 16,
            alignItems: "center",
          }}>
          <Text style={{ color: "#2563eb", fontWeight: "700", fontSize: 16 }}>
            Analyse
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
