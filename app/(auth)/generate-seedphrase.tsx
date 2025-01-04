import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Wallet as WalletUtils } from '../utils'
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme';
import Button from '../components/Button';
import { Redirect, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { delay } from 'lodash';


export default function GenerateSeedPhrase() {
  const [loader, setLoader] = useState<boolean>(false);
  const [seedphrase, setSeedPhrase] = useState<string[]>([]);
  const [groupedPhrases, setGroupedPhrase] = useState<any[][]>();
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    const groups: any[][] = Array.from({ length: 4 }, () => [])
    seedphrase.map((item: string, index: number) => {
      if (index < 3) {
        const phrase = { "name": item, "pos": index + 1 }
        groups[0].push(phrase)
      } else if (index > 2 && index < 6) {
        const phrase = { "name": item, "pos": index + 1 }
        groups[1].push(phrase)
      } else if (index > 6 && index < 10) {
        const phrase = { "name": item, "pos": index + 1 }
        groups[2].push(phrase)
      } else {
        const phrase = { "name": item, "pos": index + 1 }
        groups[3].push(phrase)
      }
    })
    setGroupedPhrase(groups)
  }, [seedphrase])

  const navigateToConfirmSeedphrase = () => {
    return router.push({
      pathname: "/(auth)/confirm-seedphrase",
      params: { seedphrase: JSON.stringify(seedphrase) }
    });
  }

  const infoContainer = () => {
    return (
      <View className='justify-center mx-5'>
        <Text className='text-primaryOrangeHex text-2xl font-[600]'>
          Write down your seedphrase
        </Text>
        <Text className='text-white mt-3'>
          This is your seed phrase. Writeit down on a paper and keep it in a
          safe place. You'll be asked to re-enter this phrase (in-order) on
          the next step for confirmation.
        </Text>
      </View>
    )
  }



  const revealMnemonic = async () => {
    const phrase: any = await WalletUtils.generateMnemonics()
    if (phrase) {
      setSeedPhrase(phrase.split(' '));
    }
  }

  const renderSeedPhrase = () => {
    return (
      <View>
        {groupedPhrases ? (
          <View className='justify-center m-5'>
            {groupedPhrases?.map((phrases, index) => (
              <View key={index} className='flex flex-row gap-4'>
                {phrases.map((item, i) => (
                  <View key={i} className='flex-1 bg-primaryGreyHex items-center mt-5 p-3 rounded-xl '>
                    <Text className='text-white'>{item.pos + ". " + item.name}</Text>
                  </View>
                ))}
              </View>
            ))}
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
    setLoader(false)
    revealMnemonic();
    setLoader(true);
  }, [])

  return (
    <SafeAreaView
      className='flex-1 bg-black'>
      <View
        style={{ paddingTop: top }}
        className='flex-1'>
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

