import { BackHandler, Image, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { act, useEffect, useState } from 'react'
import { BorderRadius, Colors, FontFamily, FontSize, Size, Spacing } from '../theme'
import Button from '../components/Button'
import PageNav from '../components/PageNav'
import Tab from '../components/tabs/Tab'
import IconView from '../components/IconView'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import {
    Price as PriceActions, Token as TokenActions,
    Wallet as WalletsAction
} from '../common/actions';
import { Token as TokenService } from '../services'
import { Wallet as WalletsUtils } from '../utils';
import { Avatar } from '@/app/components/Avatar'
import QRCode from 'react-native-qrcode-svg';
import { inject, observer } from 'mobx-react'
import Tabs from '@/app/components/tabs/Tabs'
import { useQuery } from '@tanstack/react-query';
import ListItem from '../components/TransactionItem'
import { format } from 'date-fns';
import { Icons } from '../components/icons'
import TransactionItem from '../components/TransactionItem'
import TokenItem from '../components/TokenItem'
import { ITokenStore } from '@/interfaces/tokens'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { add } from 'lodash'


const Home: React.FC<any> = inject('wallets', "tokens", "prices")(observer(
    ({ wallets, tokens, prices }) => {
        const address: string = wallets.currentWallet.address;
        const importedTokens = tokens.tokens;
        const { priceChange1h } = tokens?.tokenDetails[0] || 0;
        const router = useRouter();
        const [modalVisible, setModalVisible] = useState(false);
        const [activeTab, setActiveTab] = useState(true);
        const [selectedTab, setSelectedTab] = useState("Tokens");
        const [balance, setBalance] = useState<string>('');
        const [balanceValue, setBalanceValue] = useState<string>('');
        const [price, setPrice] = useState(0);
        const [fiatValue, setFiatValue] = useState('');
        const [tokenDetails, setTokenDetails] = useState({});
        const [transactionHistory, setTransactionHistory] = useState<any>();
        const tabs: string[] = ["Tokens", "NFTs", "Transactions"]

        console.log("current wallet address home ", address)

        const getPrice = useQuery({
            queryKey: ['price'],
            queryFn: async () => {
                try {
                    const response = await fetch(`/price`);

                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setPrice(data?.data.result)
                    return data;

                } catch (error) {
                    throw error;
                }
            },
        })


        const transactions = useQuery({
            queryKey: ['transactions'],
            queryFn: async () => {
                try {
                    const response = await fetch(`/transactions`);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setTransactionHistory(data?.data?.result)
                    return data;

                } catch (error) {

                    throw error;
                }
            },
        })

        const getTokenDetails = useQuery({
            queryKey: ['details'],
            queryFn: async () => {
                try {
                    const response = await fetch(`/details`);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }

                    const data = await response.json();
                    console.log("token details ", data?.data.result)
                    return data;

                } catch (error) {

                    throw error;
                }
            },
        })



        const selectTab = (tab: string) => {
            setSelectedTab(tab);
            walletBalance()
        }


        const transactionType = (from: string) => {
            if (from !== address) {
                return "Received"
            }

            return "Sent"
        }

        const fiatAmount = (amount: string) => {
            return Number(prices.usd * Number(WalletsUtils.formatBalance(amount))).toFixed(2);

        }

        const formatAmount = (amount: string) => {
            return Number(WalletsUtils.formatBalance(amount)).toFixed(2)
        }


        const formatData = (timestamp: number) => {
            return format(new Date(timestamp * 1000), "MMM d 'at' h:mm a");

        }

        const transactionStatus = (status: string) => {
            if (status === "1") {
                return "confirmed"
            } else if (status === "0") {
                return "failed"
            } else {
                return "pending"
            }
        }

        const walletBalance = async () => {
            try {
                console.log("current wallet currentWallet home ", wallets.currentWallet, " ", address)
                const currentBalance = await WalletsAction.walletBalance(wallets.currentWallet, address);
                console.log("current wallet currentBalance home ", currentBalance)
                const formattedBalance = await WalletsUtils.formatBalance(currentBalance)
                console.log("current wallet formattedBalance home ", formattedBalance)
                setBalance(Number(formattedBalance).toFixed(5));
            } catch (error) {
                console.log(error)
            }
        }


        useEffect(() => {
            if (!transactions) {

            }
        }, [transactionHistory]);


        useEffect(() => {
            walletBalance();
            if (balance) {
                const fiatBalance = Number(prices.usd * Number(balance)).toFixed(2);
                setBalanceValue(fiatBalance)
            }
        }, []);

        useEffect(() => {
            PriceActions.setPrice(getPrice.data?.data)
        }, [price])

        useEffect(() => {
            const details = TokenActions.addTokenDetails(getTokenDetails.data?.data)
            setTokenDetails(details);

        }, [])

        return (
            <SafeAreaView
                className={`flex-1 bg-black`}>
                <View className='flex-1 m-5'>
                    <View
                        className={`justify-center rounded-3xl h-[100]`}>
                        {balance && <Text className='text-white text-4xl font-semibold'>{balance} {"ETH"}</Text>}
                        {balanceValue &&
                            <View className='flex flex-row items-center'>
                                <Text className='text-white text-xl font-semibold'>{balanceValue}</Text>
                                <Text className='text-xl text-green-500 ml-3'>{priceChange1h}%</Text>
                            </View>
                        }
                    </View>
                    <View className={`flex-row gap-5`}>
                        <View className={`flex-1 flex-row justify-center items-center 
                            bg-primaryGreyHex rounded-2xl p-1`}>
                            <Button
                                style='p-2'
                                children={
                                    <IconView
                                        iconType="MaterialCommunityIcons"
                                        iconName="send"
                                        size={24}
                                        color="#fff"
                                    />}
                                label='Send'
                                onPress={() => {
                                    router.push({
                                        pathname: '/send',
                                        params: { fromAddress: address }
                                    })
                                }} />
                        </View>
                        <View className={`flex-1 flex-row justify-center items-center 
                             bg-primaryGreyHex rounded-2xl p-1`}>
                            <Button
                                style='p-2'
                                children={
                                    <IconView
                                        iconType="MaterialCommunityIcons"
                                        iconName="check"
                                        size={24}
                                        color="#fff"
                                    />}
                                label='Receive'
                                onPress={() => setModalVisible(true)} />
                        </View>
                    </View>
                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}>
                        <View className='flex-1 justify-center items-center'
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                            <TouchableOpacity
                                className='flex-1 justify-center items-center'
                                onPress={() => setModalVisible(false)}
                                activeOpacity={1}>
                                <View className='p-3 m-5 rounded-3xl justify-center items-center'>
                                    <View className='flex justify-center items-center'>
                                        <View className='bg-white p-3 rounded-lg flex'>
                                            <QRCode
                                                size={220}
                                                value={address} />
                                        </View>
                                        <View className='flex-row mt-5 p-3'>
                                            <Text className='text-white text-sm mr-3 truncate'>
                                                {address}
                                            </Text>
                                            <IconView
                                                iconType="MaterialCommunityIcons"
                                                iconName="copy"
                                                size={24}
                                                color="#fff" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View className='flex-1 mt-5'>
                        <Tabs
                            tabs={tabs.map((tab: string, index: number) => (
                                <Tab
                                    key={index}
                                    isActive={tab === selectedTab ? activeTab : !activeTab}
                                    onPress={() => (selectTab(tab))}
                                    label={tab} />
                            ))} />

                        {selectedTab === "Tokens" &&
                            <View className='flex-1 mt-10'>
                                <View className='flex-row items-center'>
                                    <Text className='flex-1 text-white text-lg font-semibold'>Add Tokens</Text>
                                    <TouchableOpacity
                                        onPress={() => (
                                            router.push('/import-tokens')
                                        )}>
                                        <Image
                                            resizeMode='contain'
                                            source={Icons.add}
                                            tintColor={'white'}
                                            className='w-5 h-5 mx-5' />
                                    </TouchableOpacity>
                                </View>
                                {importedTokens?.map((token: any) => (
                                    <TokenItem
                                        logo={token.logo}
                                        symbol={token.symbol}
                                        balanceValue=''
                                        priceChange=''
                                        balance={token.balance} />
                                ))}
                            </View>
                        }

                        {selectedTab === "Transactions" &&
                            transactionHistory?.map((item: any) => (
                                <TransactionItem
                                    timestamp={formatData(item.timeStamp)}
                                    from={item.from}
                                    to={item.to}
                                    value={formatAmount(item.value)}
                                    txreceipt_status={transactionStatus(item.txreceipt_status)}
                                    type={transactionType(item.from)}
                                    fiatValue={fiatAmount(item.value)} />
                            ))}
                    </View>
                </View>
            </SafeAreaView>
        )
    }))


export default Home