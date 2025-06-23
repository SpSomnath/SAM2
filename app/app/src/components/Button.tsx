import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
export default function Button(props: any) {

    
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: '#2563EB', // blue
          borderRadius: 8,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop:15,
          marginBottom:15,
          shadowColor: '#2563EB',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
        
        onPress={props.onPress}
      >
       <Text
       style={{
         fontSize: 16,
         fontFamily: 'Poppins-Medium',
         color: 'white',
         textAlign: 'center'
       }}
       >{props.title}</Text>
       </TouchableOpacity>
    </View>
  )
}