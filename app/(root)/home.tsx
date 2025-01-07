import { BackHandler, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { act, useEffect, useState } from 'react'
import { BorderRadius, Colors, FontFamily, FontSize, Size, Spacing } from '../theme'
import Button from '../components/Button'
import PageNav from '../components/PageNav'
import Tab from '../components/tabs/Tab'
import IconView from '../components/IconView'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Price, Wallet as WalletsAction } from '../common/actions';
import { Wallet as WalletsUtils } from '../utils';
import { Avatar } from '@/app/components/Avatar'
import { wallets } from '@/app/stores'
import QRCode from 'react-native-qrcode-svg';
import { inject, observer } from 'mobx-react'
import Tabs from '@/app/components/tabs/Tabs'
import { useQuery } from '@tanstack/react-query';
import ListItem from '../components/ListItem'
import { format } from 'date-fns';


const Home: React.FC<any> = inject('wallets')(observer(({ wallets }: { wallets: any }) => {
    const address: string = wallets.currentWallet.address;
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Tokens");
    const [balance, setBalance] = useState();
    const [balanceValue, setBalanceValue] = useState('');
    const [price, setPrice] = useState(0);
    const [priceChange, setPriceChange] = useState('9.07%');
    const [transactionHistory, setTransactionHistory] = useState<any>();
    const tabs: string[] = ["Tokens", "NFTs", "Transactions"]

    const getPrice = useQuery({
        queryKey: ['price'],
        queryFn: async () => {
            try {
                const response = await fetch(`/price`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetching kbfeve data...', data);

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
                console.log('Fetching transaction data...');
                const response = await fetch(`/transactions`);
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Fetched Transaction Data:', data.data.result);
                setTransactionHistory(data?.data?.result)
                return data;

            } catch (error) {

                console.error('Fetch Transaction Error:', error);
                throw error;
            }
        },
    })

    const selectTab = (tab: string) => {
        setSelectedTab(tab);
        walletBalance()
    }


    const walletBalance = async () => {
        try {
            const currentBalance = await wallets.currentWallet.provider.getBalance(address);
            console.log("balance currentBalance === ", currentBalance);
            const formattedBalance = await WalletsUtils.formatBalance(currentBalance);
            const balanceV = Number(price * Number(WalletsUtils.formatBalance(formattedBalance))).toFixed(2)
            setBalance(formattedBalance);  
            setBalanceValue(balanceV);  
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const transactionType = (from: string) => {
        if (from !== address) {
            return "Received"
        }

        return "Sent"
    }

    const fiatAmount = (amount: string) => {
        return Number(price * Number(WalletsUtils.formatBalance(amount))).toFixed(2);
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

    useEffect(() => {
        if (!transactions) {

        }
    }, [transactionHistory]);


    useEffect(() => {
        if (!address) {
            walletBalance();
        }
    }, [address]);


    useEffect(() => {
        if (!price) {
            setPrice(getPrice.data?.data?.USD);
        }
    }, [price])


    return (
        <SafeAreaView className={`flex-1 bg-black`}>
            <View className={`justify-center m-5  mt-20 rounded-3xl`}>
                <Text className='text-white font-JakartaBold 
                text-4xl font-semibold'>{0.47995} {"ETH"}</Text>
                <View className='flex flex-row'>
                    <Text className='text-white text-xl font-semibold'>{balanceValue}</Text>
                    <Text className='text-xl text-green-500 ml-3'>{priceChange}</Text>
                </View>
            </View>
            <View className={`flex-row mx-5 my-5 gap-5`}>
                <View className={`flex-1 flex-row justify-center items-center 
                    bg-primaryGreyHex rounded-2xl p-1`}>
                    <Button
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
                                pathname: '/send'
                            })
                        }} />
                </View>
                <View className={`flex-1 flex-row justify-center items-center 
                    bg-primaryGreyHex rounded-2xl p-1`}>
                    <Button
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
                <View className={`flex-1 flex-row justify-center items-center 
                    bg-primaryGreyHex rounded-2xl p-1`}>
                    <Button
                        children={
                            <IconView
                                iconType="MaterialCommunityIcons"
                                iconName="check"
                                size={24}
                                color="#fff"
                            />}
                        label='Buy'
                        onPress={() => setModalVisible(true)} />
                </View>
            </View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View className='flex-1  justify-center items-center'
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
            <View className='flex-1'>
                <Tabs
                    tabs={tabs.map((tab: string) => (
                        <Tab
                            isActive={tab === selectedTab ? activeTab : !activeTab}
                            onPress={() => (selectTab(tab))}
                            label={tab} />
                    ))} />
                {selectedTab === "Transactions" &&
                    transactionHistory?.map((item: any) => (
                        <ListItem
                            timestamp={formatData(item.timeStamp)}
                            from={item.from}
                            to={item.to}
                            value={formatAmount(item.value)}
                            txreceipt_status={transactionStatus(item.txreceipt_status)}
                            type={transactionType(item.from)}
                            fiatValue={fiatAmount(item.value)} />
                    ))}
            </View>
        </SafeAreaView>
    )
}))

export default Home