import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { router } from 'expo-router'
import { set } from 'lodash'
import { ITokenStore } from '@/interfaces/tokens'
import { ethers } from 'ethers'
import { inject, observer } from 'mobx-react'
import { ERC20_ABI } from '../constants/erc20TokenAbi'
import { Wallet as WalletsUtils } from '../utils';
import { tokens } from '../stores'
import { Token as TokenActions } from '../common/actions'
import { Token as TokenService } from '../services'

const ImportTokens: React.FC<any> = inject('wallets')(observer(({ wallets }: { wallets: any }) => {
    const walletAddress: string = wallets.currentWallet.address;
    const provider = wallets.currentWallet.provider;
    const [symbol, setSymbol] = useState<string>('');
    const [tokenAddress, setTokenAddress] = useState<string>('');
    const [decimals, setDecimals] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [tokens, setTokens] = useState<ITokenStore[]>([]);

    const addToken = () => {
        TokenActions.saveTokens(tokens);
        router.back();
    }

    useEffect(() => {
        const tokenDetails = async () => {
            setLoader(true)
            try {
                const contract = new ethers.Contract(tokenAddress, ERC20_ABI, WalletsUtils.devProvider);
                const balance = await contract.balanceOf(walletAddress);
                const decimals = await contract.decimals();
                const symbol = await contract.symbol();
                const name = await contract.name();

                setDecimals(decimals);
                setSymbol(symbol);
                setLoader(false)

                const token: ITokenStore = {
                    name: name,
                    symbol: symbol,
                    tokenAddress: tokenAddress,
                    decimals: decimals,
                    balance: ethers.utils.formatUnits(balance, decimals),
                    logo: ''
                }

                setTokens([...tokens, token])

            } catch (error) {
                console.error('Error fetching symbol:', error);
            }
        }

        tokenDetails();
    }, [tokenAddress])


    useEffect(() => {
        const loadTokens = async () => {
            const tokens: ITokenStore[] = await TokenService.loadTokens();
            setTokens(tokens);
        }
        loadTokens();
    }, [])

    return (
        <View className='flex-1 bg-black px-5'>
            <InputField
                value={tokenAddress && tokenAddress}
                onChangeText={(value: string) => setTokenAddress(value)}
                placeholder='0x0000000000000000000000000000000000000000'
                placeholderTextColor='gray'
                label='Contract Address'
                inputStyle='p-4'
                containerStyle='border border-gray-800' />
            <InputField
                value={symbol && symbol}
                onChangeText={(value: string) => setSymbol(value)}
                placeholder='SYM'
                placeholderTextColor='gray'
                label='Symbol'
                inputStyle='p-4'
                containerStyle='border border-gray-800 mt-5' />
            <InputField
                value={decimals != 0 && decimals.toString()}
                onChangeText={(value: string) => (setDecimals(parseInt(value)))}
                placeholder='18'
                placeholderTextColor='gray'
                label='Decimals'
                inputStyle='p-4'
                containerStyle='border border-gray-800 mt-5' />
            <View className='flex-1 justify-end mb-20'>
                <View className='flex-row mt-5 gap-5'>
                    <Button
                        onPress={() => router.back()}
                        style='flex-1 bg-gray-800 p-4'
                        label='Cancel' />
                    <Button
                        onPress={() => addToken()}
                        style='flex-1 bg-gray-800'
                        label='Add Tokens' />
                </View>
            </View>
        </View>
    )
}))

export default ImportTokens

const styles = StyleSheet.create({})