import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Scanner from '../components/Scanner';
import { router } from 'expo-router';

const Scan = () => {
  const [qrCode, setQrCode] = useState<string>('');
  const [showQr, setShowQr] = useState<boolean>(false);


  const onQrRead = (qrText: string) => {
    setQrCode(qrText);
    setShowQr(false);


    if (qrCode !== '') {
      router.push({
        pathname: '/send',
        params: { toAddress: qrCode }
      })
    } else {
      console.log('invalid qr code')
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1'>
        <Scanner onRead={onQrRead} />
      </View>
    </SafeAreaView>
  )
}

export default Scan
