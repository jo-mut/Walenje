import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageNav from '@/app/components/PageNav'

const Tokens = () => {
  return (
    <SafeAreaView className='flex-1 bg-black'>
      <PageNav
        title='Tokens' />
      <View className='flex-1'>

      </View>
    </SafeAreaView>
  )
}

export default Tokens

const styles = StyleSheet.create({})