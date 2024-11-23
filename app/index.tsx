import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [account, setAccount] = useState<boolean>(false);

  if (account) {
    return <Redirect href={'/(root)/(tabs)/home'}/>
  } 
  return <Redirect href={'/(auth)/sign-up'} />
}
