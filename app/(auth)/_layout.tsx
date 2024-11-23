import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="generate-seedphrase" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-seedphrase" options={{ headerShown: false }} />
    </Stack>
  )
}

