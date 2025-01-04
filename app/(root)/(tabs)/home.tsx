import { BackHandler, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BorderRadius, Colors, FontFamily, FontSize, Size, Spacing } from '../../theme'
import Button from '../../components/Button'
import PageNav from '../../components/PageNav'
import Tab from '../../components/tabs/Tab'
import IconView from '../../components/IconView'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Avatar } from '@/app/components/Avatar'
import { wallets } from '@/app/stores'
import QRCode from 'react-native-qrcode-svg';
import { inject, observer } from 'mobx-react'



const Home: React.FC<any> = inject('wallets')(observer(({ wallets }) => {
    const address: string = wallets.currentWallet.address;
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);


    const navigateToTransactScreens = (path: any) => {
        return router.push({
            pathname: path
        })
    }

    useEffect(() => {
        const disableBackHandler = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', disableBackHandler);
        return () => backHandler.remove();
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-black' style={{paddingTop: 0}}>
            <PageNav
                title='Wallet' />
            <View className={`items-center justify-center mx-5 p-10 mt-5 
                bg-primaryGreyHex rounded-3xl`}>
                <Text className='text-xs text-white'>Balance</Text>
                <Text className='text-white font-JakartaBold 
                text-3xl font-[600]'>400.00</Text>
            </View>
            <View className={`flex-row justify-between mx-5 my-5 gap-5`}>
                <View className={`flex-1 justify-center items-center 
                    bg-primaryGreyHex rounded-3xl p-3`}>
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
                            navigateToTransactScreens('/send')
                        }} />
                </View>
                <View className={`flex-1 justify-center items-center 
                    bg-primaryGreyHex rounded-3xl p-3`}>
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
                                        color="#fff"/>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View className='flex-1 mx-5'>
                <Text className='text-2xl text-white font-[600] my-3'>Transactions</Text>

            </View>
        </SafeAreaView>
    )
}))

export default Home