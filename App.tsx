import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { getLatestBlock } from "./src/services/etherService";
import { connectWallet, disconnectWallet } from "./src/services/walletService";


const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = async () => {
    const { signer } = await connectWallet();
    if (signer) {
      setWalletAddress(await signer.getAddress());
    }
  };

  const handleDisconnect = async () => {
    disconnectWallet();
    setWalletAddress(null);
  };

  return (
    <View>
      <Text>Wallenje</Text>
      {walletAddress ? (
        <View>
          <Text>Connected: {walletAddress}</Text>
          <Button title="Disconnect Wallet" onPress={handleDisconnect} />
        </View>
      ) : (
        <View>
          <Button title="Connect Wallet" onPress={handleConnect} />
        </View>
      )}
    </View>
  );
};

export default App;