import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Input(props: any) {
  return (
    <View>
        
      <TextInput
        style={{
          height: 44,
          borderColor: '#E5E7EB', // light gray border
          borderWidth: 1,
          borderRadius: 8, // more rounded
          paddingHorizontal: 16,
          backgroundColor: '#F9FAFB', // subtle background
          fontSize: 16,
          width: '100%',
          marginTop:15,
          }}
        placeholder={props.title}
        placeholderTextColor="#9CA3AF" 
        {...props}
        value={props.value}
        onChangeText={text =>{props.setValue(text)}}
        />
    </View>
  )
}