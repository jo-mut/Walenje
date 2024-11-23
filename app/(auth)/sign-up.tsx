import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
                        style={{
                            backgroundColor: Colors.primaryGreyHex,
                            padding: Spacing.space_16,
                            radius: 20,
                        }}
                        onPress={() => ('')}>
                    </Button>
                </View>

                <View style={styles.CreateWalletContainer}>
                    <Button
                        label='Create new wallet'
                        style={{
                            backgroundColor: Colors.primaryOrangeHex,
                            padding: Spacing.space_16,
                            radius: BorderRadius.radius_20,
                        }}
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