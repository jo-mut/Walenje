import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import Home from '../screens/home/Home'
import Account from '../screens/account/Account'

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
      <Tab.Screen name='home'  component={Home}></Tab.Screen>
      <Tab.Screen name='account'  component={Account}></Tab.Screen>
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

