import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
    const [currentGroup, setCurrentGroup] = useState<number>(0);
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [groupedPhrases, setGroupedPhrase] = useState<any[][]>([]);

    const isValidSequence = () => {
        groupedPhrases.map((group: any) => {
            group.map((item: any) => {
                if (!item.selected) return;
            })
        })

        return true;
    }

    const navigateToLandingPage = (fromAddress: any) => {
        if (isValidSequence()) {
            return router.replace({
                pathname: "/(root)/(tabs)/home",
                params: { fromAddress: fromAddress }
            })
        } else {
            console.log("Please confirm your seedphrase")
        }


    }

    const onPressConfirm = async () => {
        try {
            const wallet = await WalletUtils.loadWalletFromMnemonics(phrase, 0);
            await WalletsActions.addWallet(wallet);
            await WalletsActions.saveWallets();
            navigateToLandingPage(wallet);
        } catch (e) {
            console.log('Error confirming seedphrase', e);
        }
    }

    const selectWord = (index1: number, index2: number) => {
        const updatedWords: any[][] = [...groupedPhrases]
        if (groupedPhrases[currentGroup][currentWordIndex].name !== updatedWords[index1][index2].name) {
            console.log(groupedPhrases[currentGroup][currentWordIndex].name)
            return;
        }
        if (currentWordIndex < groupedPhrases[currentGroup].length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            setCurrentGroup(currentGroup + 1)
            setCurrentWordIndex(0);
        }
        updatedWords[index1][index2].selected = !updatedWords[index1][index2].selected
        setGroupedPhrase(updatedWords)
    }




    const renderHints = () => {
        return (
            <View className='justify-center'>
                <View className='flex flex-row gap-4'>
                    {groupedPhrases[currentGroup]?.map((item: any) => (
                        <View
                            className={`flex-1 items-center p-3 rounded-xl 
                                ${groupedPhrases[currentGroup][currentWordIndex] === item ? 'bg-gray-900' : 'bg-primaryGreyHex'}`}>
                            <Text className='text-white'>{item.selected ? item.name : item.pos}</Text>
                        </View>
                    ))}
                </View>
            </View>
        )
    }

    const renderSeedPhrase = () => {
        return (
            <View className='justify-center m-5'>
                {groupedPhrases?.map((phrases, index) => (
                    <View key={index} className='flex flex-row gap-4'>
                        {phrases.map((item, i) => (
                            <TouchableOpacity
                                onPress={() => {
                                    selectWord(index, i)
                                }}
                                className={`flex-1 items-center mt-5 p-3 rounded-xl 
                                ${groupedPhrases[index][i].selected ? 'bg-gray-900' : 'bg-primaryGreyHex'}`}>
                                <Text className='text-white'>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        )
    }

    useEffect(() => {

        console.log(" groupedPhrases:", groupedPhrases);
        console.log("currentWordIndex changed:", currentWordIndex);
    }, [currentWordIndex]);

    useEffect(() => {
        console.log("currentGroup changed:", currentGroup);
    }, [currentGroup]);

    useEffect(() => {
        const groups: any[][] = Array.from({ length: 4 }, () => [])
        phrase.map((item: string, index: number) => {
            if (index < 3) {
                const phrase = { "name": item, "pos": index + 1, "selected": false }
                groups[0].push(phrase)
            } else if (index > 2 && index < 6) {
                const phrase = { "name": item, "pos": index + 1, "selected": false }
                groups[1].push(phrase)
            } else if (index > 6 && index < 10) {
                const phrase = { "name": item, "pos": index + 1, "selected": false }
                groups[2].push(phrase)
            } else {
                const phrase = { "name": item, "pos": index + 1, "selected": false }
                groups[3].push(phrase)
            }
        })
        setGroupedPhrase(_.shuffle(groups))
    }, [])

    return (
        <View className='flex-1'>
            <View className='text-white mx-5'>
                <Text className='text-primaryOrangeHex font-semibold text-2xl'>
                    Confirm your seedphrase
                </Text>
            </View>
            <View className='bg-primaryGreyHex rounded-3xl p-5 mx-5 mt-10'>
                <Text className='text-white mb-5'>
                    Select each word in the order it was presented to you
                </Text>
                {renderHints()}
            </View>
            {renderSeedPhrase()}
            <View className='flex-1 justify-end'>
                <Button
                    style='p-4'
                    label='Confirm you seedphrase'
                    bgVariant='primary'
                    onPress={() => onPressConfirm()}>
                </Button>
            </View>
        </View>
    )
}

export default ConfirmBox
