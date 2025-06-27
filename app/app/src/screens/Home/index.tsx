import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useEffect } from "react";
import React from "react";
import { Link, router } from "expo-router";
import useGlobal from "@/core/global";
import Colors from "@/constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Card from "@/components/card";
import utils from "@/core/utils";

import Item from "@/components/Item";
// import devices from "@/core/devices";

const Header = () => {
  const user = useGlobal((state) => state.user);
  return (
    <View
      style={{
        height: 60,
        backgroundColor: Colors.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 4,
      }}>
      <Text style={{ fontSize: 24, fontFamily: "Poppins-Medium", margin: 15 }}>
        DashBoard
      </Text>
      <View
        style={{
          margin: 15,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Link
          style={{
            marginRight: 10,
          }}
          href="/src/screens/Home/alert">
          <FontAwesomeIcon icon={["fas", "bell"]} size={25} color="#555" />
        </Link>
        <Link href="/src/screens/Profile/profileScreen">
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 50,
            }}
            resizeMode="contain"
            source={utils.thumbnail(user.thumbnail)}
          />
        </Link>
      </View>
    </View>
  );
};

function AutomationType({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} size={24} color="#333" />
      <Text style={{ fontSize: 12, marginTop: 4 }}>{label}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const socketConnect = useGlobal((state) => state.socketConnect);
  const socketClose = useGlobal((state) => state.socketClose);
  const devices = useGlobal((state) => state.devices);

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);
  return (
    <>
      <View>
        <Header />
        {/* <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-around",
          }}>
          <AutomationType icon={("fas", "home")} label="Home" />
          <AutomationType icon={("fas", "tractor")} label="Agriculture" />
          <AutomationType icon={("fas", "industry")} label="Industry" />
          <AutomationType icon={("fas", "building")} label="Office" />
        </View> */}
        {/* cards */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/src/screens/Device/DevicePage",
                params: { filter: "",title: "Connected Device" },
              });
            }}
            style={{ width: "50%", marginBottom: 0 }}>
            <Card number={10} title="Connected" type="connected" />
          </Pressable>

          <Pressable
            onPress={() => {
              router.push({
                pathname: "/src/screens/Device/DevicePage",
                params: { filter: "active", title: "Active Device" },
              });
            }}
            style={{ width: "50%", marginBottom: 0 }}>
            <Card number={6} title="Active" type="active" />
          </Pressable>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/src/screens/Device/DevicePage",
                params: { filter: "inactive", title: "Inactive Device" },
              });
            }}
            style={{ width: "50%", marginBottom: 0 }}>
            <Card number={3} title="Inactive" type="inactive" />
          </Pressable>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/src/screens/Device/DevicePage",
                params: { filter: "abort", title: "Active Device" },
              });
            }}
            style={{ width: "50%", marginBottom: 0 }}>
            <Card number={1} title="Abort" type="abort" />
          </Pressable>
        </View>
        <View
          style={{
            margin: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            Active Devices
          </Text>
          <Pressable
            onPress={() => router.push("/src/screens/Device/ActiveDevice")}>
            <FontAwesomeIcon
              style={{
                marginRight: 10,
              }}
              icon={"chevron-right"}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {devices
          .filter((device) => device.status === "active") // Filter for active devices
          .map((device) => (
            <Item key={device.id} details={device} />
          ))}
      </ScrollView>
    </>
  );
}
