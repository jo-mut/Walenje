import {wallet as WalletStore, wallets as WalletsStore } from "../../stores"
import {Wallets as WalletsService} from '../../services'
import {Wallet as WalletUtils} from '../../utils'


export async function addWallet(wallet: any) {
    WalletsStore.isLoading(true)
    WalletsStore.addWallet(wallet);
    WalletsStore.isLoading(false);
}

export async function loadWallets() {
    WalletsStore.isLoading(true);
    const pks: any[] = await WalletsService.loadWalletPKs();
    pks.map(pk => {
        console.log('actions/wallets: ', pk)
        const wallet = WalletUtils.loadWalletFromPrivateKey(pk);
        WalletsStore.addWallet(wallet);
    });
    WalletsStore.isLoading(false);
}

export async function updateBalance(wallet:any) {
    const balance = await wallet.getBalance();
    WalletsStore.setBalance(wallet.getAddress(), balance);
}

export async function removeWallet(wallet: any) {
    WalletsStore.removeWallet(wallet);
}

export async function saveWallets() {
    await WalletsService.saveWalletPKs(WalletsStore.list);
}

export async function selectWallet(wallet: any) {
    WalletStore.select(wallet);
}

// export async function updateHistory(wallet:any) {
//     WalletStore.isLoading(true);
//     const { data } = await ApiService.getHistory(wallet.getAddress());
//     if (data.status == 1) WalletStore.setHistory(data.result);
//     WalletStore.isLoading(false);
// }