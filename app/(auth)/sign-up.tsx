import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import { BorderRadius, Colors, Spacing,  } from '../theme';
import PageNav from '../components/PageNav';
import { Redirect, router } from 'expo-router';


export default function SignUp() {

    const onNavigateToCreateMnemonics = () => {
        return router.push("/(auth)/generate-seedphrase")
    }

   
    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.container}>
                <View style={{flex: 1}}>

                </View>
                <View>
                    <Button
                        label='Import using seed phrase'
                        bgVariant='gray'
                        onPress={() => router.push('/(auth)/import-wallet')}>
                    </Button>
                </View>

                <View style={styles.CreateWalletContainer}>
                    <Button
                        label='Create new wallet'
                        isBold={true}
                        bgVariant='primary'
                        onPress={() => onNavigateToCreateMnemonics()}>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'stretch',
        flex: 1,
        padding: 20
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },

    CreateWalletContainer: {
        marginTop: Spacing.space_20,
    }
});