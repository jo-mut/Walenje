import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BorderRadius, Colors, FontFamily, FontSize, Size, Spacing } from '../../theme'
import Button from '../../components/Button'
import PageNav from '../../components/PageNav'
import Tab from '../../components/tabs/Tab'
import IconView from '../../components/IconView'
import {router, useLocalSearchParams } from 'expo-router';


export default function Home() {
    const [activeTab, setActiveTab] = useState(false);
    const fromAccount: any = useLocalSearchParams();

    const navigateToScreen = (path: any) => {
        return router.push({
            pathname: path,
            params: {address : fromAccount}
        })
    }

    return (
        <SafeAreaView
            style={styles.Container}>
            <PageNav
                left='scan-helper'
                right='dots-vertical'
                title='Wallet' />
            <View style={styles.WalletActions}>
                <Text style={styles.BalanceTitle}>Current Balance</Text>
                <Text style={styles.BalanceAmount}>400.00</Text>
                <View style={styles.ActionsContainer}>
                    <Button
                        children={
                            <IconView
                                iconType="MaterialCommunityIcons"
                                iconName="send"
                                size={24}
                                color="#fff"
                            />}
                        size='large'
                        type='rounded'
                        label='Send'
                        style={{
                            marginHorizontal: 10,
                        }}
                        onPress={() => {
                            navigateToScreen('/send')
                        }} />
                    <Button
                        children={
                            <IconView
                                iconType="MaterialCommunityIcons"
                                iconName="check"
                                size={24}
                                color="#fff"
                            />}
                        size='large'
                        type='rounded'
                        label='Receive'
                        style={{
                            marginHorizontal: 10,
                        }}
                        onPress={() => {
                            navigateToScreen('/receive')
                        }} />
                </View>
            </View>
            <View style={styles.Tabs}>
                <Tab
                    label='Tokens'
                    size='medium'
                    isActive={activeTab}
                    style={{ marginRight: Spacing.space_10 }}
                    onPress={() => {
                        setActiveTab(true)
                    }} />
                <Tab
                    label='NFTs'
                    size='medium'
                    isActive={!activeTab}
                    style={{ marginRight: Spacing.space_10 }}
                    onPress={() => {
                        setActiveTab(false)
                    }} />
            </View>
            <View style={styles.ListContainer}>

            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'black',
        justifyContent: 'space-between',
        flex: 1,
        paddingTop: Spacing.space_20,
    },
    WalletActions: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryDarkGreyHex,
        paddingTop: Spacing.space_36,
        borderRadius: BorderRadius.radius_20,
        marginTop: Spacing.space_20,
        marginBottom: Spacing.space_20,
        marginHorizontal: Spacing.space_20


    },
    BalanceTitle: {
        fontSize: FontSize.size_12,
        fontFamily: FontFamily.poppins_light,
        fontWeight: '400',
        color: Colors.primaryWhiteHex,
    },
    BalanceAmount: {
        fontSize: FontSize.size_24,
        fontFamily: FontFamily.poppins_light,
        fontWeight: '600',
        color: Colors.primaryWhiteHex,
    },
    BalanceValue: {
        fontSize: FontSize.size_30,
        fontFamily: FontFamily.poppins_light,
        color: Colors.primaryWhiteHex,
    },
    ListContainer: {
        flex: 1,
    },
    ActionsContainer: {
        flexDirection: 'row',
        paddingVertical: Spacing.space_30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Tabs: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginHorizontal: Spacing.space_20

    }
});
