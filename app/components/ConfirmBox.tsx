import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import _ from 'lodash';
import { Wallet as WalletUtils } from '../utils'
import { Wallet as WalletsActions } from '../common/actions';
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';
import { router } from 'expo-router';
import Button from './Button';

type ConfirmBoxProps = {
    phrase: string[];
}


const ConfirmBox: React.FunctionComponent<ConfirmBoxProps> = ({ phrase }) => {
    const [selectable, setSelectable] = useState<string[]>([...phrase]);
    const [selected, setSelected] = useState<string[]>([]);

    const isValidSequence = () => {
        return _.isEqual(phrase, selected)
    }

    const navigateToLandingPage = (fromAddress: any) => {
        return router.navigate({
            pathname: "/(root)/(tabs)/home",
            params: { fromAddress: fromAddress }
        })

    }

    const onPressMnemonic = (mnemonic: string, isSelected: boolean) => {
        if (isSelected) {
            setSelectable(selectable.filter(m => m !== mnemonic));
            setSelected([...selected, mnemonic]);
        } else {
            setSelectable([...selectable, mnemonic]);
            setSelected(selected.filter(m => m !== mnemonic));
        }
    }

    const renderMnemonic = (mnemonic: string, index: number, selected: boolean) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    onPressMnemonic(mnemonic, true)
                }}>
                <View className='items-center justify-center bg-primaryGreyHex 
                rounded-xl'>
                    <Text className='text-white p-3'>{mnemonic}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSelected = () => {
        return (
            <>
                {selected.length > 0 &&
                    <View className='flex flex-row justify-center flex-wrap gap-6 my-5'>
                        {selected.map((mnemonic, index) => renderMnemonic(mnemonic, index, false))}
                    </View>
                }
            </>
        )
    }

    const renderSelectable = () => {
        return (
            <>
                {selectable.length > 0 ? (
                    <View className='flex-1'>
                        <Text className='text-white text-center m-10'>
                            Select each word in the order it was presented to you in the previous screen
                        </Text>
                        <View className='flex flex-row justify-center flex-wrap gap-6 m-5'>
                            {selectable.map((mnemonic, index) =>
                                renderMnemonic(mnemonic, index, true)
                            )}
                        </View>
                    </View>
                ) : (
                    <></>
                )}
            </>

        )
    }

    const onPressConfirm = async () => {
        if (isValidSequence()) {
            try {
                const wallet = await WalletUtils.loadWalletFromMnemonics(phrase);
                await WalletsActions.addWallet(wallet);
                await WalletsActions.saveWallets();
                navigateToLandingPage(wallet);
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
        <View className='flex-1'>
            {renderSelected()}
            {renderSelectable()}
            <View className='flex-1 justify-end m-5'>
                <Button
                    label='Confirm you seedphrase'
                    bgVariant='primary'
                    onPress={() => onPressConfirm()}>
                </Button>
            </View>
        </View>
    )
}

export default ConfirmBox
