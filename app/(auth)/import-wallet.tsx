import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button';
import { Wallet as WalletUtils } from '../utils'
import { Wallet as WalletsActions } from '../common/actions';
import { Alert } from 'react-native';
import { router } from 'expo-router';


export default function ImportWallet() {
  const [seedphrase, setSeedPhrase] = useState<string>();

  const isValidSequence = (phrase?: string[]) => {

    return true;
  }

  const navigateToLandingPage = () => {
    router.push('/(root)/home')
  }

  const handleImportWallet = async () => {
    const seedphraseArray = seedphrase?.trim().split(' ')
    if (isValidSequence(seedphraseArray)) {
      try {
        const wallet = await WalletUtils.loadWalletFromMnemonics(seedphraseArray, 1);
        await WalletsActions.addWallet(wallet);
        await WalletsActions.saveWallets();
        navigateToLandingPage();
      } catch (e) {
        console.log('Error confirming seedphrase', e);
      }
    } else {
      Alert.alert(
        'Please confirm your seedphrase'
      );
    }
  }


  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1'>
        <View
          className='flex m-3 rounded-2xl py-5 bg-primaryGreyHex'>
          <InputField
            containerStyle='px-4'
            placeholder="Write your seedphrase here"
            multiline
            placeholderTextColor="gray"
            value={seedphrase}
            onChangeText={(value: string) => {
              setSeedPhrase(value)
            }}>
          </InputField>
        </View>
        <View className='flex-1 justify-end m-5'>
          <Button
            style='p-4'
            label='Continue'
            bgVariant='primary'
            onPress={() => (handleImportWallet())}>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({})