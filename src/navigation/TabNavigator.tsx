import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import About from "../screens/About";
import Contact from "../screens/Contacts";

export type BottomTabParams = {
  Home: undefined;
  About: undefined;
  Contact: undefined;
}

const Tab = createBottomTabNavigator<BottomTabParams>();

const BottomTabNavigator: React.FunctionComponent = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={About} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;