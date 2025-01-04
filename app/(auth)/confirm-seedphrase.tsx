import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Wallet as WalletUtils } from '../utils'
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme';
import Button from '../components/Button';
import ConfirmBox from '../components/ConfirmBox';
import { Redirect, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

    const { top } = useSafeAreaInsets();

    return (
        <SafeAreaView
            className='flex-1 bg-black'>
            <View
                style={{ paddingTop: top }}
                className='flex-1 bg-black'>
                {infoContainer()}
                <ConfirmBox
                    phrase={phrase} />
            </View>
        </SafeAreaView >
    )

}
