import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import IconView from '../../components/IconView'
import { Colors } from '@/app/theme'
import { Icons } from '@/app/components/icons'

const Layout = () => {
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors.primaryDarkGreyHex,
                    overflow: 'hidden',                
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }
            }}>
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <IconView
                            iconType="MaterialCommunityIcons"
                            iconName="home"
                            size={24}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
                        />
                }} />

            <Tabs.Screen
                name='tokens'
                options={{
                    title: 'Tokens',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <IconView
                            icon={Icons.nft}
                            iconName="NFTs"
                            size={24}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
                        />
                }} />

            <Tabs.Screen
                name='swap'
                options={{
                    title: 'Swap',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <IconView
                            iconType="MaterialCommunityIcons"
                            iconName="swap-horizontal"
                            size={24}
                            color={focused ? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
                        />
                }} />
        </Tabs >
    )
}

export default Layout

const styles = StyleSheet.create({})