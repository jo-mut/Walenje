import { Redirect, router } from "expo-router";
import { Token as TokenActions, Wallet as WalletActions, } from './common/actions'
import { ITokenStore } from "@/interfaces/tokens";
import { useEffect, useState } from "react";
import { Token as TokenService, Wallets } from "@/app/services";
import { inject, observer } from "mobx-react";
import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { View } from "react-native";
import { wallets } from "./stores";


const Index = inject('wallets')(observer(
  ({ wallets }: { wallets: any }) => {
  const [defaultWallet, setDefaultWallet] = useState<ethers.Wallet>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {

    const fetchData = async () => {
      try {
        // await Wallets.deleteWalletPKs();
        await WalletActions.loadWallets();
        setDefaultWallet(wallets.currentWallet?.address)
        console.log("current privateKey *** ", wallets.currentWallet.privateKey)
        await TokenActions.loadTokens();
        setLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    };

    fetchData();

  }, []);


  // if (loading) {
  //   return <View className="flex-1 bg-black"></View>
  // } else {
  //   console.log("current defaultWallet *** ", defaultWallet)
  //   if (defaultWallet) {
  //     return <Redirect href={'/(root)/home'} />
  //   }

  //   return <Redirect href={'/(auth)/sign-up'} />
  // }

  return <Redirect href={'/(auth)/sign-up'} />


}))

export default Index