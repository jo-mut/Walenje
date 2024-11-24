import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Wallet as WalletUtils } from '../utils'
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme';
import Button from '../components/Button';
import { Redirect, router } from 'expo-router';


export default function GenerateSeedPhrase() {
  const [seedphrase, setSeedPhrase] = useState<string[]>([]);

  const navigateToConfirmSeedphrase = () => {
    return router.push({
      pathname: "/(auth)/confirm-seedphrase",
      params: { seedphrase: JSON.stringify(seedphrase) }
    });
  }

  const infoContainer = () => {
    return (
      <View className='items-center justify-center'>
        <Text className='text-primaryOrangeHex text-2xl font-[600]'>
          Write down your seedphrase
        </Text>
        <Text className='text-white text-center p-5'>
          This is your seed phrase. Writeit down on a paper and keep it in a
          safe place. You'll be asked to re-enter this phrase (in-order) on
          the next step for confirmation.
        </Text>
      </View>
    )
  }

  const displaySeedPhrase = () => {
    return (
      <View className='flex flex-row justify-center flex-wrap gap-6 m-5'>
        {seedphrase.map((item, index) => (
          <View className='bg-primaryGreyHex p-3 rounded-xl'>
            <Text className='text-white'>{(index + 1) + ". " + item}</Text>
          </View>
        ))}
      </View>
    )
  }

  const revealMnemonic = async () => {
    const phrase: any = await WalletUtils.generateMnemonics()
    console.log(phrase.split(' '))
    if (phrase) {
      setSeedPhrase(phrase.split(' '));
    }
  }

  const renderSeedPhrase = () => {
    return (
      <View>
        {seedphrase ? (
          <View>
            {displaySeedPhrase()}
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={revealMnemonic}>
              <Text>Reveal SeedPhrase</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  useEffect(() => {
    revealMnemonic();
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1'>
        {infoContainer()}
        {renderSeedPhrase()}
        <View className='flex-1 justify-end m-5'>
          <Button
            label='Continue'
            bgVariant='primary'
            onPress={() => navigateToConfirmSeedphrase()}>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )

}

