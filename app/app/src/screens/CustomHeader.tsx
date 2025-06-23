import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Colors from "@/constants/colors";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CustomHeader({ title }: { title: string }) {
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
      <View
        style={{
          width: 40,
          alignItems: "flex-start",
          justifyContent: "center",
        }}>
        <Pressable onPress={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </Pressable>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins-Medium",
            textAlign: "center",
          }}>
          {title}
        </Text>
      </View>

      <View
        style={{ width: 40, alignItems: "flex-end", justifyContent: "center" }}>
        <Pressable onPress={() => router.push("/src/screens/Device/AddDevice")}>
          <FontAwesomeIcon icon={faPlus} size={20} />
        </Pressable>
      </View>
    </View>
  );
}
