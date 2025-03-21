import { BackHandler, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { act, useEffect, useState } from 'react'
import { BorderRadius, Colors, FontFamily, FontSize, Size, Spacing } from '../../theme'
import Button from '../../components/Button'
import PageNav from '../../components/PageNav'
import Tab from '../../components/tabs/Tab'
import IconView from '../../components/IconView'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Wallet as WalletsAction } from '../../common/actions';
import { Wallet as WalletsUtils } from '../../utils';
import { Avatar } from '@/app/components/Avatar'
import { wallets } from '@/app/stores'
import QRCode from 'react-native-qrcode-svg';
import { inject, observer } from 'mobx-react'
import Tabs from '@/app/components/tabs/Tabs'



const Home: React.FC<any> = inject('wallets')(observer(({ wallets }) => {
    const address: string = wallets.currentWallet.address;
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Token");
    const [balance, setBalance] = useState();
    const [balanceValue, setBalanceValue] = useState();
    const [priceChange, setPriceChange] = useState();
    const tabs: string[] = ["Tokens", "NFTs", "Collectibles", "Transactions", "Swap"]

    const selectTab = (tab: string) => {
        setSelectedTab(tab);
    }

    const walletBalance = async () => {
        const currentBalance = await WalletsAction.currentWalletBalance(wallets.currentWallet, address);
        setBalance(await WalletsUtils.formatBalance(currentBalance))
        console.log("current balance ", balance)
    }

    useEffect(() => {
        walletBalance()
    }, [])

    return (
        <SafeAreaView className={`flex-1 bg-black`}>
            <View className={`justify-center mx-5 py-10 mt-5 rounded-3xl`}>
                <Text className='text-white font-JakartaBold 
                text-4xl font-semibold'>{balance || 0.0} {"ETH"}</Text>
                <View className='flex flex-row'>
                    <Text className='text-white text-xl'>{balanceValue || 0.0}</Text>
                    <Text className='text-white text-xl'>{priceChange || " 0.0%"}</Text>
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
                        style='p-3'
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
            <Tabs
                tabs={tabs.map((tab: string) => (
                    <Tab
                        isActive={tab === selectedTab ? activeTab : !activeTab}
                        onPress={() => (selectTab(tab))}
                        label={tab} />
                ))} />
        </SafeAreaView>
    )
}))

export default Home