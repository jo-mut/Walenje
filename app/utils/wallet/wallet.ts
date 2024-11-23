import { ethers } from "ethers";
import { getRandomValues } from "expo-crypto"

const { providers, utils, HDNodeWallet }: any = ethers;
const network = (process.env.NODE_ENV == 'production') ? 'mainnet' : 'goerli';
const provider = ethers.getDefaultProvider(network);

export async function generateMnemonics() {
    console.log("Seed phrase generated:");
    const randomBytes = new Uint8Array(16);
    // 128 bits of entropy 
    await getRandomValues(randomBytes);
    // Convert entropy to mnemonic 
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
    console.log("Seed phrase generated:", mnemonic);
    return mnemonic;
}

export function loadWalletFromMnemonics(mnemonics: any) {
    if (!(mnemonics instanceof Array) && typeof mnemonics !== 'string') {
        throw new Error instanceof Array
    } else if (mnemonics instanceof Array) {
        mnemonics = mnemonics.join(' ');
        const wallet = ethers.Wallet.fromMnemonic(mnemonics);
        // wallet.provider = provider;
        return wallet;
    }
}

export const loadWalletFromPrivateKey = (pk: string) => {
    try {
        if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
        return new HDNodeWallet(pk, provider);
    } catch (e) {
        throw new Error('invalid private key');
    }
}

export const formatBalance = (balance: number) => {
    return utils.formatEther(balance);
}

export const reduceBigNumbers = (items: any) => {
    if (!(items instanceof Array)) throw new Error('The input is not an Array');
    return items.reduce((prev, next) => prev.add(next), utils.bigNumberify('0'));
}

export const calculateFee = (gasUsed: number, gasPrice: number) => {
    return gasUsed * Number(formatBalance(gasPrice));

}