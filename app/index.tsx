import { Redirect } from "expo-router";
import { Token as TokenActions, Wallet as WalletActions } from './common/actions'
import { ITokenStore } from "@/interfaces/tokens";
import { useEffect } from "react";
import { Token as TokenService } from "@/app/services";


export default function Index() {
  TokenActions.loadTokens();
  const isWalletEmpty = WalletActions.loadWallets()

  if (isWalletEmpty != null) {
    return <Redirect href={'/(root)/home'} />
  }

  return <Redirect href={'/(auth)/sign-up'} />
}
