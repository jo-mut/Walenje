import { Redirect } from "expo-router";
import { Wallet as WalletActions } from './common/actions'


export default function Index() {
  const isWalletEmpty = WalletActions.loadWallets()

  // if (isWalletEmpty != null) {
  //   return <Redirect href={'/(root)/home'} />
  // }
  return <Redirect href={'/(auth)/sign-up'} />
}
