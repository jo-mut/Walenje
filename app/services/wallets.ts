import { Wallet } from 'ethers';
import { Wallet as WalletConstants} from '../constants';
import * as StorageService from './storage'

export async function loadWallet() {
    const pks: string = await StorageService.getItem(WalletConstants.STORAGE_KEY);
    return pks ? JSON.parse(pks) : [];
}

export async function saveWallet(wallets: any[]) {
    const map = wallets.map(w => w);
    await StorageService.setItem(WalletConstants.STORAGE_KEY, JSON.stringify(map));
}

export function deleteWallet() {
    return StorageService.deleteItem(WalletConstants.STORAGE_KEY);
}   