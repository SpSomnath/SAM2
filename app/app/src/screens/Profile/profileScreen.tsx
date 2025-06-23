import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { Component, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomHeader from "../CustomHeader";
import Colors from "@/constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import useGlobal from "@/core/global";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import utils from "@/core/utils";




const ProfilePicture =() => {
  const uploadThumbnail = useGlobal(state => state.uploadThumbnail)
  const user = useGlobal(state => state.user)

  return(
    <TouchableOpacity
    style={{
      marginBottom:20
    }}
onPress={async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    base64: true,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const file = result.assets[0];

    // 🔍 Extract the filename from the URI
    const fileName = file.uri.split('/').pop();

    const processedFile = {
      uri: file.uri,
      base64: file.base64,
      fileName: fileName,
    };

    uploadThumbnail(processedFile);
  }
}}

    >
      <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
          resizeMode="contain"
          source={utils.thumbnail(user.thumbnail)}
        />
        <View
        style={{
          position:"absolute",
          bottom:0,
          right:0,
          backgroundColor:'#202020',
          height:40,
          width:40,
          borderRadius:20,
          alignItems:"center",
          justifyContent:'center',
          borderWidth:3,
          borderColor: 'white',
        }}>
          <FontAwesomeIcon
          icon={'pencil'}
          size={23}
          color={'#d0d0d0'}
          />
        </View>
    </TouchableOpacity>
  )
}

function ProfileLogout() {
  const logout = useGlobal((state => state.logout))
  const authenticated = useGlobal((state) => state.authenticated);

    useEffect(() => {
    if (!authenticated) {
      router.replace('/'); // or your login screen
    }
  }, [authenticated]);
  

  return (
    <TouchableOpacity
      onPress={logout}
      style={{
        flexDirection: "row",
        height: 40,
        width: "auto",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#202020",
        paddingHorizontal: 26,
        marginTop: 40,
      }}>
      <FontAwesomeIcon icon={"right-from-bracket"} size={20} color="#d0d0d0" />
      <Text
        style={{
          paddingLeft: 7,
          color: "#d0d0d0",
        }}>
        Logout
      </Text>
    </TouchableOpacity>
  );
}



export default function profileScreen() {
  const user = useGlobal((state) => state.user)

  
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.background,
        flex: 1,
      }}>
      <CustomHeader title="Profile" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 80,
        }}>
        <ProfilePicture/>
        <Text
          style={{
            fontSize: 20,
            margin: 6,
            fontWeight: "bold",
            color: Colors.text,
          }}>
          {user.name}
        </Text>
        <Text
          style={{
            alignItems: "center",
            color: "#606060",
            fontSize: 14,
          }}>
          @{user.username}
        </Text>
        <ProfileLogout />
      </View>
    </SafeAreaView>
  );
}
