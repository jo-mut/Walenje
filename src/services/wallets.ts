import { Wallet } from 'ethers';
import { Wallet as WalletConstants} from '../constants';
import * as StorageService from './storage'

export async function loadWalletPKs() {
    const pks: string = await StorageService.getItem(WalletConstants.STORAGE_KEY);
    return pks ? JSON.parse(pks) : [];
}

export async function saveWalletPKs(wallets: any[]) {
    const map = wallets.map(w => w);
    await StorageService.setItem(WalletConstants.STORAGE_KEY, JSON.stringify(map));
}

export function deleteWalletPks() {
    return StorageService.deleteItem(WalletConstants.STORAGE_KEY);
}   