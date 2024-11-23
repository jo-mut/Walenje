import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Wallet as WalletUtils } from '../utils'
import { Wallets as WalletsActions } from '../common/actions';
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme';
import Button from '../components/Button';
import isValidSequence from '../components/ConfirmBox'
import ConfirmBox from '../components/ConfirmBox';
import { Redirect, router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';


const navigateToLandingPage = (fromAccount: any) => {
    return router.navigate({
        pathname: "/(root)/(tabs)/home",
        params: {fromAccount: fromAccount}
    })

}

const infoContainer = () => {
    return (
        <View style={styles.InfoContainer}>
            <Text style={styles.InfoTextTitle}>
                Confirm Seedphrase
            </Text>
        </View>
    )
}

export default function ConfirmSeedPhrase() {
    const { seedphrase }: any = useLocalSearchParams();
    const phrase: string[] = JSON.parse(seedphrase);
    console.log("phrase",  JSON.parse(seedphrase));
    const onPressConfirm = async () => {

        if (!isValidSequence) return;
        try {
            const wallet = await WalletUtils.loadWalletFromMnemonics(JSON.parse(seedphrase));
            await WalletsActions.addWallet(wallet);
            await WalletsActions.saveWallets();
            navigateToLandingPage(wallet);
        } catch (e) {
            console.log('Error confirming seedphrase', e);
        }
    }

    const displaySeedPhrase = () => {
        return (
            <View style={styles.SeedPhraseContainer}>
                <FlatList
                    data={phrase}
                    numColumns={2}
                    columnWrapperStyle={styles.FlatListWrapperStyle}
                    scrollEnabled={false}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity
                            style={{ flex: 1 / 2, }}
                            onPress={() => ({

                            })}>
                            <View style={styles.PhraseContainer}>
                                <View>
                                    <Text style={styles.Phrase}>{index + ". " + item}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {infoContainer()}
                <ConfirmBox
                    phrase={phrase} />
                <View style={styles.ButtonContainer}>
                    <Button
                        label='Confirm you seedphrase'
                        style={{
                            backgroundColor: Colors.primaryOrangeHex,
                            padding: Spacing.space_16,
                            radius: BorderRadius.radius_20,
                        }}
                        onPress={() => onPressConfirm()}>
                    </Button>
                </View>
            </View>
        </SafeAreaView >
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: Spacing.space_30
    },
    ConfirmContainer: {
        marginTop: Spacing.space_20,
        borderRadius: BorderRadius.radius_20,
        backgroundColor: Colors.primaryGreyHex,
        height: 100,
    },
    InfoContainer: {
        alignContent: 'center'
    },
    InfoTextTitle: {
        color: Colors.primaryOrangeHex,
        fontSize: Spacing.space_20,
        fontFamily: FontFamily.poppins_semibold,
        textAlign: 'center',
        fontWeight: '600'
    },
    InfoTextDescription: {
        marginTop: Spacing.space_10,
        color: Colors.secondaryLightGreyHex,
        fontSize: Spacing.space_15,
        textAlign: 'center'
    },
    buttonsContainer: {
        alignItems: 'center',
        color: 'black',
        padding: 20,
        backgroundColor: '#949494',
        borderRadius: 20,
        justifyContent: 'space-between'
    },
    FlatListWrapperStyle: {
        flex: 1,
        gap: Spacing.space_10,
    },
    SeedPhraseContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: Spacing.space_30,
        borderColor: Colors.primaryGreyHex,
        borderRadius: Spacing.space_16,
        borderWidth: 1,
    },
    PhraseContainer: {
        marginTop: Spacing.space_10,
        backgroundColor: Colors.primaryGreyHex,
        borderRadius: Spacing.space_12,
        paddingHorizontal: Spacing.space_10,
        paddingVertical: Spacing.space_8,
    },
    Phrase: {
        textAlign: 'center',
        color: Colors.secondaryLightGreyHex,
        fontSize: FontSize.size_14,
        marginLeft: Spacing.space_4,
        marginHorizontal: Spacing.space_30
    },
    ButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});