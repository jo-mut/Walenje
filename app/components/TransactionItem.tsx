import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Interface } from 'ethers/lib/utils'
import { TransactionProps } from '@/interfaces/transactions'

const TransactionItem: React.FC<TransactionProps> =
    ({ timestamp,
        from,
        to,
        value,
        txreceipt_status,
        type,
        fiatValue,
    }: any) => {
        return (
            <View className='flex p-3'>
                <View className='flex'>
                    <Text className='text-sm text-white'>{timestamp}</Text>
                    <View className='flex flex-row justify-between '>
                        <View className='flex-1'>
                            <Text className='text-2xl text-white'>{type} ETH</Text>
                            <Text className='text-lg text-green-500'>{txreceipt_status}</Text>
                        </View>
                        <View className='flex items-end'>
                            <Text className='text-lg text-white'>{value}</Text>
                            <Text className='text-lg  text-white'>{fiatValue}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

export default TransactionItem

const styles = StyleSheet.create({})