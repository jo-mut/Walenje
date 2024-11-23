import { ethers, Transaction, Wallet } from 'ethers';
import { action, observable } from 'mobx';

const INITIAL_STATE = {
    item: null,
    history: [],
    pendingTransactions: [],
    loading: false
}

export interface IWalletStore {
    item: any;
    history: Transaction[];
    pendingTransactions: Transaction[];
    loading: boolean;
}

export class WalletStore implements IWalletStore {
    @observable item: any = null
    @observable history: Transaction[] = []
    @observable pendingTransactions: Transaction[] = []
    @observable loading: boolean = false

    @action isLoading(state: any) {
        this.loading = Boolean(state)
    }

    @action select(wallet: Wallet) {
        if (!(wallet instanceof ethers.Wallet)) throw new Error('Invalid Wallet');
        this.item = wallet;
    }

    @action setHistory(history: Transaction[]) {
        if (!this.item) throw new Error(`Can't update the history. No wallet was selected.`)
        if (!(history instanceof Array)) throw new Error('The history must be an array.');
        this.history = history;
    }

    @action addPendingTransaction(txn: Transaction) {
        this.pendingTransactions.push(txn);
    }

    @action moveToHistory(txn: Transaction) {
        const pending = this.pendingTransactions.filter(tx => txn.hash !== tx.hash);
        this.pendingTransactions = pending;
        this.history.push(txn)
    }

    @action reset() {
        this.item = INITIAL_STATE.item;
        this.history = INITIAL_STATE.history;
        this.loading = INITIAL_STATE.loading;
        this.pendingTransactions = INITIAL_STATE.pendingTransactions;
    }

}

export default new WalletStore();
