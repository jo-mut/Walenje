import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import PageNav from '../components/PageNav'
import IconView from '../components/IconView'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { router, useLocalSearchParams } from 'expo-router'

const EnterAmount = () => {
  const { fromAddress, toAddress }:
    { fromAddress: string, toAddress: string } = useLocalSearchParams();
  const [amount, setAmount] = useState<string>();
  const [amountValue, setAmountValue] = useState<string>();
  const [showMore, setShowMore] = useState<boolean>(true);

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1 px-5'>
        <View className='flex-row mt-10 justify-between items-center'>
          <View className='flex-row justify-between rounded-xl px-3 bg-gray-800 items-center'>
            <Text className='text-white mr-3 p-3'>ETH</Text>
            <TouchableOpacity>
              <IconView
                iconType="MaterialCommunityIcons"
                iconName={showMore ? "chevron-down" : "chevron-up"}
                size={24}
                color="#fff" />
            </TouchableOpacity>
          </View>
          <View className='justify-center items-center'>
            <TouchableOpacity>
              <Text className='text-white text-lg'>USE MAX</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex bg-gray-800 mt-5 px-3 py-5 rounded-2xl'>
          <InputField
            keyboardType='numeric'
            placeholder="0.00 ETH"
            placeholderTextColor="white"
            inputStyle='text-5xl flex-1'
            value={amount}
            onChangeText={(value: string) => {
              setAmount(value)
            }} />
          <Text className='text-white text-sm '>{amountValue? "$" + amountValue : "$0.00"}</Text>
        </View>
        <View className='flex-1 justify-end'>
          <Button
            style='p-4'
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