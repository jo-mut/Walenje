import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{headerShown: false}} />
      <Stack.Screen name="send" options={{ headerShown: false }} />
      <Stack.Screen name="receive" options={{ headerShown: false }} />
      <Stack.Screen name="enter-amount" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-transaction" options={{ headerShown: false }} />
      <Stack.Screen name="receive-transaction" options={{ headerShown: false }} />
    </Stack>
  )
}
