import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./src/navigation/TabNavigation";
import Settings from "./src/screens/settings/Settings";


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Tabs' component={TabNavigator}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        <Stack.Screen name='Settings' component={Settings}
          options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },

  ConnectContainer: {
    marginTop: 100,
    backgroundColor: 'green',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App;