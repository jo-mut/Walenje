import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PageNav from '../components/PageNav'
import IconView from '../components/IconView'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { router, useLocalSearchParams } from 'expo-router'

const EnterAmount = () => {
  const { fromAddress, toAddress }: 
  {fromAddress: string, toAddress: string} = useLocalSearchParams();
  const [amount, setAmount] = useState<string>();
  const [showMore, setShowMore] = useState<boolean>(true);

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1 px-5'>
        <PageNav
          back={true}
          close={true}
          title='Amount' />
        <View className='flex justify-between items-center mt-5'>
          <View className='flex flex-row rounded-3xl bg-primaryGreyHex px-5 items-center'>
            <Text className='text-white mr-3 p-3'>ETH</Text>
            <TouchableOpacity>
              <IconView
                iconType="MaterialCommunityIcons"
                iconName={showMore? "chevron-down" : "chevron-up"}
                size={24}
                color="#fff" />
            </TouchableOpacity>
          </View>
          <View className='absolute right-0 mt-3 items-center'>
            <TouchableOpacity>
              <Text className='text-white'>USE MAX</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex'>
          <InputField
            keyboardType='numeric'
            inputStyle='text-center'
            containerStyle='p-5'
            value={amount}
            onChangeText={(value: string) => {
              setAmount(value)
            }} />
        </View>
        <View className='flex-row justify-center'>
          <View className='flex-row border border-cyan-500 items-center rounded-3xl p-3 mt-10'>
            <Text className='text-white mx-3 text-lg'>00.00</Text>
            <IconView
              iconType="MaterialCommunityIcons"
              iconName={'compare-vertical'}
              size={24}
              color="#fff"
            />
          </View>
        </View>
        <View className='flex-1 justify-end'>
          <Button
            label='Continue'
            bgVariant='primary'
            onPress={() => router.push({
              pathname: '/confirm-transaction',
              params: { toAddress: toAddress, amount: amount }
            })}>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default EnterAmount

const styles = StyleSheet.create({})