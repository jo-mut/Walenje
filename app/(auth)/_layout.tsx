import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import PageNav from '../components/PageNav'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: false }} />
      <Stack.Screen
        name="import-wallet"
        options={{ headerShown: false }} />
      <Stack.Screen
        name="generate-seedphrase"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              back={true} />
          ),
        }} />
      <Stack.Screen
        name="confirm-seedphrase"
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <PageNav
              back={true} />
          ),
        }} />
    </Stack>
  )
}

