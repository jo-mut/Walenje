import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabIcon from '../../components/TabIcon'

const Layout = () => {
    return (
        <Tabs
            initialRouteName='home'
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 20,
                    paddingBottom: 0,
                    overflow: 'hidden',
                    marginHorizontal: 10,
                    marginBottom: 20,
                    height: 56,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'absolute'
                }
            }}>
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused}
                            icon='' />
                }} />

            <Tabs.Screen
                name='tokens'
                options={{
                    title: 'Tokens',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused}
                            icon='' />
                }} />

            <Tabs.Screen
                name='swap'
                options={{
                    title: 'Swap',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused}
                            icon='' />
                }} />

            <Tabs.Screen
                name='dapps'
                options={{
                    title: 'Dapps',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused}
                            icon='' />
                }} />

        </Tabs >
    )
}

export default Layout

const styles = StyleSheet.create({})