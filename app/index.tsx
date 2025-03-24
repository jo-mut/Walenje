import { Redirect } from "expo-router";
import { Token as TokenActions, Wallet as WalletActions } from './common/actions'
import { ITokenStore } from "@/interfaces/tokens";
import { useEffect } from "react";
import { Token as TokenService } from "@/app/services";
import { inject, observer } from "mobx-react";


const Index = inject('wallets', "tokens", "prices")(observer(
  ({ wallets, tokens, prices }) => {

    TokenActions.loadTokens();

    if (!wallets.list) {
      return <Redirect href={'/(root)/home'} />
    }

    return <Redirect href={'/(auth)/sign-up'} />

  }))

export default Index