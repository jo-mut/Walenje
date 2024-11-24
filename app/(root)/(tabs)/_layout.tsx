import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import IconView from '../../components/IconView'
import { Colors } from '@/app/theme'

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
                    height: 78,
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
                            color={focused? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
                        />
                }} />

            <Tabs.Screen
                name='tokens'
                options={{
                    title: 'Tokens',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <IconView
                            iconType="MaterialCommunityIcons"
                            iconName="check"
                            size={24}
                            color={focused? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
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
                            color={focused? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
                        />
                }} />

            <Tabs.Screen
                name='dapps'
                options={{
                    title: 'Dapps',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <IconView
                            iconType="MaterialCommunityIcons"
                            iconName="check"
                            size={24}
                            color={focused? Colors.primaryOrangeHex : Colors.primaryWhiteHex}
                        />
                }} />

        </Tabs >
    )
}

export default Layout

const styles = StyleSheet.create({})