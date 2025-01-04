import { Redirect } from "expo-router";
import { useState } from "react";
import { wallet as walletStore } from "./stores";
import * as StorageService from "./services/storage"
import { Wallet } from "./constants";
import { Wallet as WalletActions } from './common/actions'


export default function Index() {
  const isWalletEmpty = WalletActions.loadWallets()

  // if (isWalletEmpty != null) {
  //   return <Redirect href={'/(root)/(tabs)/home'} />
  // }
  return <Redirect href={'/(auth)/sign-up'} />
}
