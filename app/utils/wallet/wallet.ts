import { ethers } from "ethers";
import { getRandomValues } from "expo-crypto"

const { providers, utils, HDNodeWallet }: any = ethers;
const INFURA_API_KEY = "22158a6c78f74359a46bd8c2c03988ca";
const network = (process.env.NODE_ENV == 'production') ? 'mainnet' : 'sepolia';
const provider = new ethers.providers.InfuraProvider(network, INFURA_API_KEY);


export async function generateMnemonics() {
    const randomBytes = new Uint8Array(16);
    // 128 bits of entropy 
    await getRandomValues(randomBytes);
    // Convert entropy to mnemonic 
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    return mnemonic;
}

export function loadWalletFromMnemonics(mnemonics: any, account: number) {
    if (account == null && account > 12) return;
    if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string') {
        throw new Error("Invalid mnemonics: expected a string or array")
    } else if (mnemonics instanceof Array) {
        mnemonics = mnemonics.join(' ');
        const wallet = ethers.Wallet.fromMnemonic(mnemonics,  "m/44'/60'/0'/0/" + account);
        console.log("Provider is set up:", provider);
        const connectedWallet = wallet.connect(provider);
        return connectedWallet;
    }
}

export const loadWalletFromPrivateKey = (pk: ethers.Wallet) => {
    try {
        if (pk.address.indexOf('0x') !== 0) {
            return new HDNodeWallet(pk, provider);
        }
    } catch (e) {
        throw new Error('invalid private key');
    }
}

export const formatBalance = (balance: number) => {
    return utils.formatEther(balance);
}

export const reduceBigNumbers = (items: any) => {
    if (!(items instanceof Array)) throw new Error('The input is not an Array');
    return items.reduce((prev, next) => prev.add(next), ethers.BigNumber.from('0'));
}

export const calculateFee = (gasUsed: number, gasPrice: number) => {
    return gasUsed * Number(formatBalance(gasPrice));

}

export function estimateFee({ gasLimit, gasPrice }: any) {
    return ethers.BigNumber.from(String(gasLimit)).mul(String(gasPrice));
}