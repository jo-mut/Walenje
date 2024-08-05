import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./TabNavigator";
import Login from "../screens/Login";
import RestoreWallet from "../screens/RestoreWallet";
import CreateWallet from "../screens/CreateWallet"
import Contact from "../screens/Contacts";

export type RootStackParams = {
  Login: undefined;
  RestoreWallet: undefined;
  CreateWallet: undefined;
  Home: undefined;
}

const Stack = createNativeStackNavigator<RootStackParams>();

const MainStackNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='RestoreWallet' component={RestoreWallet} />
      <Stack.Screen name='CreateWallet' component={CreateWallet} />
      <Stack.Screen name='Home' component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator