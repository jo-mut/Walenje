import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SIZE, SPACING } from '../../theme/theme'
import Button from '../../components/Button'
import PageNav from '../../components/PageNav'
import Tab from '../../components/tabs/Tab'
import IconView from '../../components/IconView'


export const Wallet: React.FC = ({ navigation, route}: any) => {
    const [activeTab, setActiveTab] = useState(false);
    const fromAccount: any = route.params.fromAccount;
    console.log("loaded wallet ", fromAccount)

    const navigateToScreen = (component: string) => {
        navigation.navigate(component, {fromAccount: fromAccount})
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
                            navigateToScreen('Send')
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
                            navigateToScreen('Receive')
                        }} />
                    <Button
                        children={
                            <IconView
                                iconType="MaterialCommunityIcons"
                                iconName="swap-horizontal"
                                size={24}
                                color="#fff"
                            />}
                        size='large'
                        type='rounded'
                        label='Swap'
                        style={{
                            marginHorizontal: 10,
                        }}
                        onPress={() => {
                            navigateToScreen('Swap')
                        }} />
                </View>
            </View>
            <View style={styles.Tabs}>
                <Tab
                    label='Tokens'
                    size='medium'
                    isActive={activeTab}
                    style={{ marginRight: SPACING.space_10 }}
                    onPress={() => {
                        setActiveTab(true)
                    }} />
                <Tab
                    label='NFTs'
                    size='medium'
                    isActive={!activeTab}
                    style={{ marginRight: SPACING.space_10 }}
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
        paddingTop: SPACING.space_20,
    },
    WalletActions: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
        paddingTop: SPACING.space_36,
        borderRadius: BORDERRADIUS.radius_20,
        marginTop: SPACING.space_20,
        marginBottom: SPACING.space_20,
        marginHorizontal: SPACING.space_20


    },
    BalanceTitle: {
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_light,
        fontWeight: '400',
        color: COLORS.primaryWhiteHex,
    },
    BalanceAmount: {
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_light,
        fontWeight: '600',
        color: COLORS.primaryWhiteHex,
    },
    BalanceValue: {
        fontSize: FONTSIZE.size_30,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
    },
    ListContainer: {
        flex: 1,
    },
    ActionsContainer: {
        flexDirection: 'row',
        paddingVertical: SPACING.space_30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Tabs: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginHorizontal: SPACING.space_20

    }
});
