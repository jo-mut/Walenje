import '@walletconnect/react-native-compat'
import '@ethersproject/shims'

import { createAppKit, defaultConfig, useAppKit} from '@reown/appkit-ethers5-react-native'
import { View } from 'react-native'

// 1. Get projectId from https://cloud.reown.com
const projectId = 'ef546b57329d8c4e87261aaa48102656';

// 2. Create config
const metadata = {
  name: 'Walenje',
  description: 'Web3 wallet',
  url: 'https://walenje.com',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://'
  }
}

const config = defaultConfig({ metadata })

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com'
}

const chains = [mainnet, polygon]

// Creates the modal
createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function ConnectView() {
  return useAppKit();
}