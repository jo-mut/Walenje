import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import Home from '../screens/home/Home'
import Account from '../screens/account/profile/Profile'
import Market from '../screens/markets/Market'
import News from '../screens/news/News'
import Profile from '../screens/account/profile/Profile'
import { COLORS } from '../theme/theme'
import CustomIcons from '../icons/CustomIcons'
import Icon from 'react-native-vector-icons/';

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: true,
      tabBarStyle: styles.tabBarStyle,
      tabBarBackground: () => (
        <BlurView
          overlayColor=''
          blurAmount={15}
          style={styles.tabBarStyle} />
      ),
    }}>

      <Tab.Screen
        name='Home'
        component={Market}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='wallet'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />)
        }}></Tab.Screen>
      <Tab.Screen
        name='Wallet'
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='wallet'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></Tab.Screen>
      <Tab.Screen
        name='News'
        component={News}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='news'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></Tab.Screen>
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name='account'
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          )
        }}></Tab.Screen>
    </Tab.Navigator >
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    borderTopColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0
  },

  blurViewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
})

export default TabNavigator

