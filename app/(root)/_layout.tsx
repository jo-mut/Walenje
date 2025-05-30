import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Icons } from '../components/icons'
import IconView from '../components/IconView'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function RootLayout() {
  const { top } = useSafeAreaInsets();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="scan" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          headerShown: true,
          headerBackground: () => (
            <View
              style={{ paddingTop: top }}
              className='flex-1 bg-black '>
              <View className='flex flex-row items-center justify-between px-5'>
                <View className='rounded-full w-10 h-10 items-center justify-center bg-cyan-900'>
                  <Text className='text-white'>TM</Text>
                </View>
                <TouchableOpacity
                  className='flex flex-row items-center'>
                  <Text className='text-white text-sm'>Ethereum network</Text>
                  <IconView
                    iconType="MaterialCommunityIcons"
                    iconName={"chevron-down"}
                    size={18}
                    color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }} />
      <Stack.Screen
        name="send"
        options={{
          headerShown: true,
          headerTitle: "Send Crypto",
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
      <Stack.Screen name="receive" options={{ headerShown: false }} />
      <Stack.Screen
        name="import-tokens"
        options={{
          headerTitle: "Add Token",
          headerTintColor: 'white',
          headerBackground: () => (
            <View className='flex-1 bg-black' />
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
      <Stack.Screen
        name="enter-amount"
        options={{
          headerTitle: "Enter Amount",
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
        name="confirm-transaction"
        options={{
          headerShown: true,
          headerTitle: "Confirm Transaction",
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
      <Stack.Screen name="receive-transaction" options={{ headerShown: false }} />
    </Stack>
  )
}
