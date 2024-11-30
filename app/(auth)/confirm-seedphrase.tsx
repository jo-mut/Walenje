import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Wallet as WalletUtils } from '../utils'
import { Wallets as WalletsActions } from '../common/actions';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme';
import Button from '../components/Button';
import ConfirmBox from '../components/ConfirmBox';
import { Redirect, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

const infoContainer = () => {
    return (
        <View className='flex'>
            <Text className='justify-center items-center'>
                Confirm Seedphrase
            </Text>
        </View>
    )
}

export default function ConfirmSeedPhrase() {
    const { seedphrase }: any = useLocalSearchParams();
    const phrase: string[] = JSON.parse(seedphrase);
    return (
        <SafeAreaView className='flex-1 bg-black'>
            <View className='flex-1 bg-black'>
                {infoContainer()}
                <ConfirmBox
                    phrase={phrase} />
            </View>
        </SafeAreaView >
    )

}
