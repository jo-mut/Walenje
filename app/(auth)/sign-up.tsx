import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import { BorderRadius, Colors, Spacing, } from '../theme';
import { ResizeMode, Video } from 'expo-av';
import { useAssets } from 'expo-asset';
import PageNav from '../components/PageNav';
import { Redirect, router } from 'expo-router';


export default function SignUp() {
    const [assets] = useAssets([require('@/assets/videos/intro.mp4')]);

    const onNavigateToCreateMnemonics = () => {
        return router.push("/(auth)/generate-seedphrase")
    }


    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                {assets &&
                    <Video
                        resizeMode={ResizeMode.COVER}
                        isMuted
                        isLooping
                        shouldPlay
                        source={{ uri: assets[0].uri }}
                        style={{ height: '100%', width: '100%' }} />}
            </View>

            <View style={styles.CreateWalletContainer}>
                <Button
                    style='mx-5 p-4'
                    label='Import using seed phrase'
                    bgVariant='gray'
                    onPress={() => router.push('/(auth)/import-wallet')}>
                </Button>
                <Button
                    style='m-5 p-4'
                    label='Create new wallet'
                    isBold={true}
                    bgVariant='primary'
                    onPress={() => onNavigateToCreateMnemonics()}>
                </Button>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'stretch',
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },

    CreateWalletContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginTop: Spacing.space_20,
    }
});