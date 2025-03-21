import  WalletStore from '../../stores/wallet'
import { notify } from "./general";
import { ethers, Transaction, Wallet } from "ethers";
import { Transaction as TransactionService } from "../../services";

export async function waitForTransaction(wallet: Wallet, txn: Transaction) {
    await wallet.provider.waitForTransaction(txn.hash as string);
    WalletStore.moveToHistory(txn);
    console.log("TRANSACTION IS SUCCESSFUL", txn)
    notify('Transaction confirmed', 500);
}

// async function sendEther(wallet: Wallet, destination: string, amount, options) {
//     const txn: Transaction = await TransactionService.sendEther(wallet, destination, amount, options);
//     WalletStore.addPendingTransaction(txn);
//     waitForTransaction(wallet, txn);
// }

export async function sendTransaction(wallet: Wallet, txn: Transaction) {
    if(!(wallet instanceof Wallet)) throw new Error('Invalid wallet');
    txn = await TransactionService.sendTransaction(wallet, txn);
    WalletStore.addPendingTransaction(txn);
    waitForTransaction(wallet, txn);
    return txn;
}