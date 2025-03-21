import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Interface } from 'ethers/lib/utils'
import { TransactionProps } from '@/interfaces/transactions'
import { ITokenStore } from '@/interfaces/tokens'

const TokenItem: React.FC<ITokenStore> =
    ({ balance,
        name,
        logo,
        symbol,
        value,
        balanceValue,
        priceChange
    }: any) => {
        return (
            <View className='flex flex-row py-3'>
                {logo && <Image
                    source={logo}
                    resizeMode='contain'
                    className='w-8 h-8 rounded-full' />}
                <View className='flex-1'>
                    <View className='flex flex-row justify-between'>
                        <View className='flex-1'>
                            <Text className='text-lg text-white'>{name}</Text>
                            <Text className='text-gray-300'>{value}</Text>
                        </View>
                        <View className='flex items-end'>
                            <Text className='text-lg text-white'>{balance} {symbol}</Text>
                            <Text className='text-lg  text-white'>{priceChange}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

export default TokenItem

const styles = StyleSheet.create({})