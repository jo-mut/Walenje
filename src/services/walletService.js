import Web3Modal from 'web3modal';
import {ethers} from 'ethers';
import WalletConnectProvider from '@walletconect/react-native-dapp';
  
const providerOptions = {
    walletConnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: '22158a6c78f74359a46bd8c2c03988ca',
        },
    },
};

const web3modal = new Web3Modal({
    providerOptions,
})

let provider;
let signer;

export async function connectWallet() {
    try {
        provider = await web3modal.connnect();
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        signer = ethersProvider.getSigner();
        console.log('Wallet connected', await signer.getAddress());
        return {ethersProvider, signer};
    }catch (error) {
        console.error('Failed to connect wallet:', error);
    }    
}

export async function disconnectWallet() {
    if (provider && provider.disconnect) {
        await provider.disconnect();
    }

    web3modal.clearCachecProvider();
    provider = null;
    signer = null;
    console.log('Wallet disconnected');
}