import { Redirect } from "expo-router";
import { useState } from "react";
import { wallet as walletStore} from "./stores";
import * as StorageService  from "./services/storage"
import { Wallet } from "./constants";


export default function Index() {
  const [account, setAccount] = useState<boolean>(false);
  const isWalletEmpty = StorageService.getItem(Wallet.STORAGE_KEY);

  console.log(isWalletEmpty);

  if (isWalletEmpty != null) {
    return <Redirect href={'/(root)/(tabs)/home'}/>
  } 
  return <Redirect href={'/(auth)/sign-up'} />
}
