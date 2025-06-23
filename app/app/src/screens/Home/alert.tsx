import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../CustomHeader'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Alert() {
  return (
    <SafeAreaView>
        <CustomHeader title='Alert'/>
      <Text>alert</Text>
    </SafeAreaView>
  )
}