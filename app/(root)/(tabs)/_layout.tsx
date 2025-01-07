import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import IconView from '../../components/IconView'
import { Colors } from '@/app/theme'
import { Icons } from '@/app/components/icons'
import { BlurView } from 'expo-blur';
import PageNav from '@/app/components/PageNav'

const Layout = () => {
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                headerBackground: () => (
                    <View className='bg-black'>
                        <BlurView
                            intensity={50}
                            tint='extraLight'
                            className='flex-1 bg-[rgba(0,0,0,0.5)]' />
                    </View>
                ),
                tabBarStyle: {
                    backgroundColor: Colors.primaryDarkGreyHex,
                    overflow: 'hidden',
                    display: 'flex',
                    paddingBottom: 30,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'absolute',
                    borderTopWidth: 0,
                }
            }}>
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: true,
                    header: () => (
                        <PageNav
                            scan={true}
                            avatar={true} />
                    ),
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