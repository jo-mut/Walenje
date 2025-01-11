import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Icons } from '../components/icons'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="send" options={{ headerShown: false }} />
      <Stack.Screen name="receive" options={{ headerShown: false }} />
      <Stack.Screen
        name="import-tokens"
        options={{
          headerTitle: "Add Token",
          headerTintColor: 'white',
          headerBackground: () => (
            <View className='flex-1 bg-black'/>
          ),
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}>
              <Image
                source={Icons.close}
                tintColor={'white'}
                resizeMode='contain'
                className='w-6 h-6' />
            </TouchableOpacity>
          )
        }} />
      <Stack.Screen name="enter-amount" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-transaction" options={{ headerShown: false }} />
      <Stack.Screen name="receive-transaction" options={{ headerShown: false }} />
    </Stack>
  )
}
