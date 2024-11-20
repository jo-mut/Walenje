import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabIcon from '../../components/TabIcon'
import { icons, Colors } from '../../constants'

const Layout = () => {
    return (
        <Tabs
            initialRouteName='index'
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
                name='messages'
                options={{
                    title: 'Message',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused}
                            icon='' />
                }} />

            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <TabIcon focused={focused}
                            icon='' />
                }} />

            <Tabs.Screen
                name='browser'
                options={{
                    title: 'Browser',
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