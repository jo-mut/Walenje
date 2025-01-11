import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { router } from 'expo-router'
import { set } from 'lodash'
import { tokens as TokenStore } from '../stores'
import { ITokenStore } from '@/interfaces/tokens'
import { ethers } from 'ethers'
import { inject, observer } from 'mobx-react'
import { ERC20_ABI } from '../constants/erc20TokenAbi'

const ImportTokens: React.FC<any> = inject('wallets')(observer(({ wallets }: { wallets: any }) => {
    const walletAddress: string = wallets.currentWallet.address;
    const provider = wallets.currentWallet.provider;
    const [name, setName] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [tokenAddress, setTokenAddress] = useState<string>('');
    const [contract, setContract] = useState<any>();
    const [balance, setBalance] = useState<string>('0');
    const [decimals, setDecimals] = useState<number>(0);


    async function addToken() {

        const token: ITokenStore = {
            name: name,
            symbol: symbol,
            contract: contract,
            decimals: decimals,
            balance: ethers.utils.formatUnits(balance, decimals),
            logo: ''
        }

        TokenStore.addToken(token);

    }

    useEffect(() => {
        async () => {
            if (contract) {

                const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
                const balance = await contract.balanceOf(walletAddress);
                const decimals = await contract.decimals();
                const symbol = await contract.symbol();

                setDecimals(decimals);
                setSymbol(symbol);
                setBalance(balance);
            }
        }
    }, [contract])

    return (
        <View className='flex-1 bg-black px-5'>
            <InputField
                value={tokenAddress && tokenAddress}
                onChangeText={(value: string) => setTokenAddress(value)}
                placeholder='0x0000000000000000000000000000000000000000'
                placeholderTextColor='gray'
                label='Token Name'
                inputStyle='p-4'
                containerStyle='border border-gray-800' />
            <InputField
                value={symbol && symbol}
                onChangeText={(value: string) => setSymbol(value)}
                placeholder='SYM'
                placeholderTextColor='gray'
                label='Token Name'
                inputStyle='p-4'
                containerStyle='border border-gray-800 mt-5' />
            <InputField
                value={decimals != 0 && decimals.toString()}
                onChangeText={(value: string) => (setDecimals(parseInt(value)))}
                placeholder='18'
                placeholderTextColor='gray'
                label='Token Name'
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