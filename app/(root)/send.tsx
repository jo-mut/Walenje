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



const Send: React.FC<any> = inject('wallets')(observer(({ wallets }) => {
  const { toAddress }: { toAddress: string } = useLocalSearchParams();
  const [sendExpanded, setSendExpanded] = useState<boolean>(true);
  const [recentsExpanded, setRecentsExpanded] = useState<boolean>(true);
  const [fromAddress, setFromAddress] = useState<string>();
  const [to, setTo] = useState<string>();


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
        <PageNav
          title='Send' />
        <View
          className='flex mt-5'>
          <View className='flex flex-row px-3'>
            <Text
              className={`text-lg text-white font-[600]`}>
              From:
            </Text>
            {sendExpanded &&
              <TouchableOpacity
                onPress={() => (setSendExpanded(!sendExpanded))}>
                <IconView
                  iconType="MaterialCommunityIcons"
                  iconName={sendExpanded ? "chevron-down" : "chevron-up"}
                  size={24}
                  color="#fff" />
              </TouchableOpacity>}
          </View>
          <View className='flex border bg-primaryDarkGreyHex  rounded-2xl'>
            <InputField
              expanded={false}
              placeholder="Sending address"
              value={wallets.currentWallet.address}
              onChangeText={(value: string) => {
                setFromAddress(value)
              }} />
          </View>
          <View className='flex flex-row px-3 mt-5'>
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
         border bg-primaryDarkGreyHex rounded-2xl'>
            <View className='flex-grow'>
              <InputField
                expanded={false}
                placeholder="Receiving address"
                value={toAddress}
                onChangeText={(value: string) => {
                  setTo(value)
                }} />
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
        <View className='flex-1 justify-end'>
          <Button
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