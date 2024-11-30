import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';


const Send = () => {
  const {address}: {address: string} = useLocalSearchParams();
  console.log('address from qr code', address);
  return (
    <View>
      <Text>Send</Text>
    </View>
  )
}

export default Send

const styles = StyleSheet.create({})