import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Wallet as WalletUtils } from '../../utils'
import { Wallets as WalletsActions } from '../../common/actions';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import Button from '../../components/Button';
import isValidSequence from '../../components/ConfirmBox'
import ConfirmBox from '../../components/ConfirmBox';
import { ethers } from 'ethers';


const navigateToLandingPage = (navigation: any) => {
    navigation.navigate('Tabs');
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

export const ConfirmMnemonic: React.FC = ({ navigation, route }: any) => {
    const [mnemonicMap, setMnemonicMap] = useState<Record<string, string>[]>([]);
    const seedphrase: string[] = route.params.mnemonic;
    const confirmRef = useRef();

    const onPressConfirm = async () => {
        if(!isValidSequence) return;
        try {
            const wallet = WalletUtils.loadWalletFromMnemonics(seedphrase);
            console.log("wallet is instance of ethers.Wallet: ", (wallet instanceof ethers.Wallet))
            await WalletsActions.addWallet(wallet);
            navigateToLandingPage(navigation);
            await WalletsActions.saveWallets();
        } catch (e) {
            console.log('Error confirming seedphrase', e);
        }
    }

    const displaySeedPhrase = () => {
        return (
            <View style={styles.SeedPhraseContainer}>
                <FlatList
                    data={seedphrase}
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
                    mnemonics={seedphrase} />
                <View style={styles.ButtonContainer}>
                    <Button
                        backgroundColor={COLORS.primaryOrangeHex}
                        color={COLORS.primaryWhiteHex}
                        label='Confirm you seedphrase'
                        style={{
                            padding: SPACING.space_16,
                            radius: BORDERRADIUS.radius_20,
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
        paddingHorizontal: SPACING.space_30
    },
    ConfirmContainer: {
        marginTop: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryGreyHex,
        height: 100,
    },
    InfoContainer: {
        alignContent: 'center'
    },
    InfoTextTitle: {
        color: COLORS.primaryOrangeHex,
        fontSize: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_semibold,
        textAlign: 'center',
        fontWeight: '600'
    },
    InfoTextDescription: {
        marginTop: SPACING.space_10,
        color: COLORS.secondaryLightGreyHex,
        fontSize: SPACING.space_15,
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
        gap: SPACING.space_10,
    },
    SeedPhraseContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: SPACING.space_30,
        borderColor: COLORS.primaryGreyHex,
        borderRadius: SPACING.space_16,
        borderWidth: 1,
    },
    PhraseContainer: {
        marginTop: SPACING.space_10,
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: SPACING.space_12,
        paddingHorizontal: SPACING.space_10,
        paddingVertical: SPACING.space_8,
    },
    Phrase: {
        textAlign: 'center',
        color: COLORS.secondaryLightGreyHex,
        fontSize: FONTSIZE.size_14,
        marginLeft: SPACING.space_4,
        marginHorizontal: SPACING.space_30
    },
    ButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    }
});