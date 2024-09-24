import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getLatestBlock } from "./src/services/etherService";
import ConnectView from "./src/services/walletService";
import { AppKit } from "@reown/appkit-ethers5-react-native";


const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const { open } = ConnectView();

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.ConnectContainer} onPress={() => open()}>
        <Text>Open Connect Modal</Text>
      </TouchableOpacity>
      <AppKit/>
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

export default App;