import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react';
import PageNav from '../components/PageNav'
import { router, useLocalSearchParams } from 'expo-router'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { ethers } from "ethers";
import { Wallet as WalletUtils, Transaction as TransactionUtils } from '../utils'
import { Transaction as TransactionActions, Recents as RecentsActions } from '../common/actions';

const ConfirmTransaction: React.FC<any> = inject('prices', 'wallets', 'wallet')
    (observer(({ prices, wallets, wallet }) => {
        const { toAddress, amount }
            : { toAddress: string, amount: string } = useLocalSearchParams();
        const [totalAmount, setTotalAmount] = useState<number>();
        const [dollarValue, setDollarValue] = useState();
        const [transaction, setTransaction] = useState<any>();
        const [fee, setFee] = useState<string>();
        const [fiatFee, setFiatFee] = useState<string>();
        const [fiatAmount, setFiatAmount] = useState<string>();

        console.log("toAddress CONFIRM ", toAddress)


        const estimatedFee = () => {
            const fee: any = WalletUtils.estimateFee(transaction);
            const formatBalance = WalletUtils.formatBalance(fee);
            setFee(fee)
            setTotalAmount(Number(formatBalance) + Number(amount))
            return formatBalance;
        }

        const calculateFiatAmount = () => {
            const fiatAmount = Number(prices.usd * Number(WalletUtils.formatBalance(transaction.value))).toFixed(2);
            setFiatAmount(fiatAmount);
            return fiatAmount;
        }

        const calculatedFiatEstimatedFee = () => {
            const fiatFee: string = Number(prices.usd * Number(estimatedFee())).toFixed(2);
            setFiatFee(fiatFee)
            return fiatFee
        }

        const createTransaction = async () => {
            const txn = await TransactionUtils.createTransaction(toAddress, amount);
            setTransaction(txn);
        }

        const sendTransaction = async () => {
            wallet.isLoading(true);
            calculateFiatAmount()
            calculatedFiatEstimatedFee()

            console.log("wallet ", wallets.list[0])

            try {
                const txn = await TransactionActions.sendTransaction(wallets.currentWallet, transaction);
                console.log("sent transaction value", txn.value)

                setTransaction(txn);
                // RecentsActions.saveAddressToRecents(txn.to);
            } catch (error) {
                console.log("sent transaction error", error)
            } finally {
                wallet.isLoading(false);
            }

            router.back();
        }

        useEffect(() => {
            createTransaction()
        }, [])

        useEffect(() => {
            if (transaction) {
                calculateFiatAmount()
                calculatedFiatEstimatedFee()
                console.log("total amount ", totalAmount)

            }
        }, [transaction])

        return (
            <SafeAreaView className='flex-1 bg-black'>
                <View className='flex-1 mx-5'>
                    <View className='flex mt-5'>
                        <Text
                            className={`text-lg px-3 text-white font-[600]`}>
                            From:
                        </Text>
                        <View className='flex border  rounded-2xl'>
                            <InputField
                                value={wallets.currentWallet.address}
                                expanded={false}
                                placeholder="From address"
                                placeholderTextColor='gray'
                                inputStyle='p-4'
                                containerStyle='border border-gray-800' />
                        </View>
                        <Text
                            className={`text-lg px-3 mt-5 text-white font-[600]`}>
                            To:
                        </Text>
                        <View className='border rounded-2xl'>
                            <InputField
                                value={toAddress}
                                expanded={false}
                                placeholder="Receiving address"
                                placeholderTextColor='gray'
                                inputStyle='p-4'
                                containerStyle='border border-gray-800' />
                        </View>
                    </View>
                    <View className='flex mt-10 bg-gray-900 rounded-2xl'>
                        <View className='p-5'>
                            <View className='flex flex-row justify-between'>
                                <Text className='text-lg text-white'>Amount</Text>
                                <Text className='text-lg text-white'>{amount} ETH</Text>
                            </View>
                            <View className='flex flex-row items-center justify-between'>
                                <View className='flex flex-row items-center'>
                                    <Text className='text-gray-300 text-sm mr-3'>Network fee</Text>
                                    <TouchableOpacity>
                                        <View className='bg-cyan-900 rounded px-3 items-center justify-center'>
                                            <Text className='text-white text-sm'>Edit</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* <Text className='text-lg text-white'>{fee} ETH</Text> */}
                            </View>
                        </View>
                        <View className='h-[1px] bg-slate-800 my-5' />
                        <View className='flex flex-row items-center justify-between p-5'>
                            <View className='flex flex-row  justify-between'>
                                <Text className='flex-1 text-lg text-white'>Total Amount</Text>
                                <View className='items-end'>
                                    <Text className='text-lg text-white'>{totalAmount?.toFixed(6)} ETH</Text>
                                    <Text className='text-sm text-gray-300'>{fiatAmount}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='flex-1 justify-end'>
                        <Button
                            style='p-4'
                            label='Send'
                            bgVariant='primary'
                            onPress={() => sendTransaction()}>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }))

export default ConfirmTransaction

const styles = StyleSheet.create({})