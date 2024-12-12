import { BigNumber, utils, Wallet } from "ethers";
import { Transaction as TransactionUtils, Wallet as WalletUtils } from '../utils'
import { parseEther } from "ethers/lib/utils";

export function sendTransaction(wallet: Wallet, transaction: any) {
    if (!(wallet instanceof Wallet)) throw new Error('Invalid wallet');
    if (!TransactionUtils.isValidTransaction(transaction)) throw new Error('Invalid transaction');
    return wallet.sendTransaction(transaction);
}

export function sendEther(wallet: Wallet, destination: string, amount: BigNumber, options: any) {
    if (!(wallet instanceof Wallet)) throw new Error('Invalid wallet');
    if (typeof destination !== 'string') throw new Error('Invalid destination address');
    if (!(amount instanceof BigNumber)) amount = parseEther(amount);
    const transaction = {
        to: destination,
        value: amount
    }
    return wallet.sendTransaction(transaction);
}