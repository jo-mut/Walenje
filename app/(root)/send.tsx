import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import PageNav from '../components/PageNav';
import { Avatar } from '../components/Avatar';
import { Colors } from '../theme';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { inject, observer } from 'mobx-react';
import { ethers } from 'ethers';
import IconView from '../components/IconView';
import { router, useLocalSearchParams } from 'expo-router'
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';



const Send: React.FC<any> = inject('wallets')(observer(({ wallets }) => {
  // const { fromAddress }: { fromAddress: string } = useLocalSearchParams();
  const [sendExpanded, setSendExpanded] = useState<boolean>(true);
  const [recentsExpanded, setRecentsExpanded] = useState<boolean>(true);
  const [recents, setRecents] = useState<string[]>([]);
  const [fromAddress, setFromAddress] = useState<string>();
  const [toAddress, setToAddress] = useState<string>();


  const navigateToEnterAmount = () => {
    if (!toAddress || !wallets.currentWallet) return;
    router.push({
      pathname: '/(root)/enter-amount',
      params: { toAddress: toAddress }
    })
  }


  React.useEffect(() => {
    setFromAddress(wallets.currentWallet);
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1 mx-5'>
        <View
          className='flex mt-5'>
          <View className='flex border  rounded-2xl'>
            <InputField
              value={wallets.currentWallet.address}
              onChangeText={(value: string) => {
                setFromAddress(value)
              }}
              expanded={false}
              placeholder="Sending address"
              placeholderTextColor='gray'
              label='Contract Address'
              inputStyle='p-4'
              containerStyle='border border-gray-800' />
          </View>
          <View className='flex flex-row justify-between px-3 mt-10'>
            <Text
              className={`text-lg text-white font-[600]`}>
              To:
            </Text>
            {recentsExpanded &&
              <TouchableOpacity
                onPress={() => (setRecentsExpanded(!recentsExpanded))}>
                <IconView
                  iconType="MaterialCommunityIcons"
                  iconName={recentsExpanded ? "chevron-down" : "chevron-up"}
                  size={24}
                  color="#fff" />
              </TouchableOpacity>}
          </View>
          <View className='flex flex-row items-center 
         border rounded-2xl'>
            <View className='flex-grow'>
              <InputField
                value={toAddress}
                onChangeText={(value: string) => {
                  setToAddress(value)
                }}
                expanded={false}
                placeholder="Receiving address"
                placeholderTextColor='gray'
                label='Contract Address'
                inputStyle='p-4'
                containerStyle='border border-gray-800' />
            </View>
            <View className='mr-3'>
              <TouchableOpacity
                onPress={() => router.push('/scan')}>
                <IconView
                  iconType="MaterialCommunityIcons"
                  iconName='scan-helper'
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View className='flex-1'>
          {recents ?
            <View className='flex-1 justify-center items-center'>
              <Text className='text-white'> No recent addresses</Text>
            </View>
            :
            <FlatList
              renderItem={(item: any) => (
                <View className='p-3'>
                  <Text>{item}</Text>
                </View>
              )}
              data={recents}
              keyExtractor={(item, index) => index.toString()}/>}
        </View> */}
        <View className='flex-1 justify-end'>
          <Button
            style='p-4'
            label='Continue'
            bgVariant='primary'
            onPress={() => navigateToEnterAmount()}>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}))

export default Send

const styles = StyleSheet.create({})