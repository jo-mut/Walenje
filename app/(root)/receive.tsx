import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { inject, observer } from 'mobx-react';
import { wallets } from '../stores';

const Receive: React.FC<any> = inject('wallets')(observer(({ wallets }) => {
  const address: string = wallets.currentWallet.address;
  return (
    <View className='flex-1 bg-black justify-center items-center'>
      <View className='bg-white p-3 rounded-lg flex'>
        <QRCode
          logoSize={1100}
          value={address} />
      </View>
      <View className='flex mt-5 p-3'>
        <Text className='text-white text-sm leading-relaxed'>
          {address}
        </Text>
      </View>
    </View>
  )
}))
export default Receive

const styles = StyleSheet.create({})