import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BorderRadius, Colors, FontFamily, FontSize, Size, Spacing } from '../../theme'
import Button from '../../components/Button'
import PageNav from '../../components/PageNav'
import Tab from '../../components/tabs/Tab'
import IconView from '../../components/IconView'
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Avatar } from '@/app/components/Avatar'


export default function Home() {
    const [activeTab, setActiveTab] = useState(false);
    const fromAccount: any = useLocalSearchParams();
    const router = useRouter();

    const navigateToTransactScreens = (path: any) => {
        return router.push({
            pathname: path,
            params: { address: fromAccount }
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
        <SafeAreaView className='flex-1 bg-black'>
            <PageNav
                title='Wallet'/>
            <View className={`items-center justify-center mx-5 p-10 mt-5 
                bg-primaryGreyHex rounded-2xl`}>
                <Text className='text-xs text-white'>Balance</Text>
                <Text className='text-white font-JakartaBold 
                text-3xl font-[600]'>400.00</Text>
            </View>
            <View className={`flex-row justify-between mx-5 my-3 gap-3`}>
                <View className={`flex-1 justify-center items-center 
                    bg-primaryGreyHex rounded-2xl p-3`}>
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
                    bg-primaryGreyHex rounded-2xl p-3`}>
                    <Button
                        children={
                            <IconView
                                iconType="MaterialCommunityIcons"
                                iconName="check"
                                size={24}
                                color="#fff"
                            />}
                        label='Receive'
                        onPress={() => {
                            navigateToTransactScreens('/receive')
                        }} />
                </View>
            </View>
            <View className='flex-1'>

            </View>
        </SafeAreaView>
    )

}