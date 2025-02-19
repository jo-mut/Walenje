import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import PageNav from '../components/PageNav'
import { Icons } from '../components/icons'

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
        options={{
          headerTitle: "Import Wallet",
          headerTintColor: 'white',
          headerBackground: () => (
            <View className='flex-1 bg-black' />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}>
              <Image
                source={Icons.leftArrow}
                tintColor={'white'}
                resizeMode='contain'
                className='w-6 h-6' />
            </TouchableOpacity>
          )
        }} />
      <Stack.Screen
        name="generate-seedphrase"
        options={{
          headerShown: true,
          headerTitle: "Seed Phrase",
          headerTintColor: 'white',
          headerBackground: () => (
            <View className='flex-1 bg-black' />
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}>
              <Image
                source={Icons.leftArrow}
                tintColor={'white'}
                resizeMode='contain'
                className='w-6 h-6' />
            </TouchableOpacity>
          )
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

