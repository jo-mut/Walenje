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


        const estimatedFee = () => {
            const fee: any = WalletUtils.estimateFee(transaction);
            const formatBalance = WalletUtils.formatBalance(fee);
            return formatBalance;
        }

        const fiatAmount = () => {
            return Number(prices.usd * Number(WalletUtils.formatBalance(transaction.value))).toFixed(2);

        }

        const fiatEstimatedFee = () => {
            return Number(prices.usd * Number(estimatedFee())).toFixed(2);
        }

        const createTransaction = async () => {
            const txn = await TransactionUtils.createTransaction(toAddress, amount);
            setTransaction(txn);
            console.log("transaction value", txn)
        }

        const sendTransaction = async () => {
            fiatAmount()
            fiatEstimatedFee()

            wallet.isLoading(true);
            console.log("wallet ", wallets.list[0])

            try {
                const txn = await TransactionActions.sendTransaction(wallets.list[0], transaction);
                console.log("sent transaction value", txn.value)

                setTransaction(txn);
                RecentsActions.saveAddressToRecents(txn.to);
            } catch (error) {
                console.log("sent transaction error", error)
            } finally {
                wallet.isLoading(false);
            }

            router.back();
        }

        useEffect(() => {
            createTransaction()

            // if (transaction) {
            //     console.log("set total amount", transaction)
            //     setTotalAmount((parseInt(amount) + estimatedFee()))
            // }
        }, [])

        return (
            <SafeAreaView className='flex-1 bg-black'>
                <View className='flex-1 mx-5'>
                    <PageNav
                        title='Confirm Transaction' />
                    <View className='flex mt-5'>
                        <Text
                            className={`text-lg px-3 text-white font-[600]`}>
                            From:
                        </Text>
                        <View className='flex border bg-primaryDarkGreyHex  rounded-2xl'>

                            <InputField
                                placeholder="Sending address"
                                value={wallets.currentWallet.address} />
                        </View>
                        <Text
                            className={`text-lg px-3 mt-5 text-white font-[600]`}>
                            To:
                        </Text>
                        <View className='border bg-primaryDarkGreyHex rounded-2xl'>
                            <InputField
                                placeholder="Receiving address"
                                value={toAddress} />
                        </View>
                    </View>
                    <View className='flex mt-5 bg-primaryDarkGreyHex rounded-2xl p-3'>
                        <View className='flex flex-row justify-between'>
                            <Text className='text-lg text-white'>Amount</Text>
                            <Text className='text-lg text-white'>{amount}</Text>
                        </View>
                        <View className='flex flex-row items-center justify-between'>
                            <View className='flex flex-row items-center'>
                                <Text className='text-gray-300 text-sm mr-3'>Network fee</Text>
                                <TouchableOpacity>
                                    <View className='bg-cyan-900 rounded-xl px-2 items-center justify-center'>
                                        <Text className='text-white text-sm'>Edit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text className='text-lg text-white'>{ }</Text>
                        </View>
                        <View className='h-[1px] bg-slate-600 mt-5 '></View>
                        <View className='flex flex-row items-center justify-between py-3'>
                            <View className='flex flex-row items-center justify-between'>
                                <Text className='text-lg text-white'>Total Amount</Text>
                                <View className='flex'>
                                    <Text className='text-lg text-white'>{totalAmount}</Text>
                                    <Text className='text-lg text-white'>{ }</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='flex-1 justify-end'>
                        <Button
                            label='Send'
                            bgVariant='primary'
                            onPress={() => (sendTransaction())}>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        );
    }))

export default ConfirmTransaction

const styles = StyleSheet.create({})