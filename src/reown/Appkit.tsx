import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ethers } from 'ethers'; 
import { AppKit } from "@reown/appkit-ethers5-react-native";
import { useAppKitProvider } from '@reown/appkit-ethers5-react-native'
import ConnectView from "./services/walletService";


const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const { open } = ConnectView();
  // reown appkit wallet provider
  const { walletProvider }: any = useAppKitProvider()


  async function ethereumProvider() {
    const provider = new ethers.providers.Web3Provider(walletProvider)
    const signer = provider.getSigner()
    return { provider, signer }
  }

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.ConnectContainer} onPress={() => open()}>
        <Text>Open Connect Modal</Text>
      </TouchableOpacity>
      <Text>{walletAddress}</Text>
      <AppKit />
    </View>
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

export default AppKit;