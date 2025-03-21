import { ethers, Wallet } from "ethers";
import { action, observable } from "mobx"

const INITIAL_STATE = {
    list: [],
    currentWallet: {},
    loading: false,
}


class WalletsStore {
    @observable list: Wallet[] = INITIAL_STATE.list;
    @observable loading = INITIAL_STATE.loading;
    @observable currentWallet = INITIAL_STATE.currentWallet

    @action isLoading = (state: boolean) =>{
        this.loading = Boolean(state)
    }

    @action addWallet = (wallet: Wallet) => {
        // if(!(wallet instanceof ethers.Wallet)) throw new Error('Invalid Wallet');
        // wallet.name = walletName;
        // wallet.description = walletDescription;
        this.currentWallet = wallet;
        this.list.push(wallet);
    }

    @action removeWallet = (wallet: any) => {
        this.list = this.list.filter(w => w.getAddress() !== wallet.getAddress());
    }

    @action setBalance = (address: any, amount: number) => {
        const wallet: any = this.list.find(wallet => wallet.getAddress == address);
        if(!wallet) throw new Error('Wallet not found');
        wallet.balance = amount;
        const otherWallets = this.list.filter(wallet => wallet.getAddress() !== address);
        this.list = [...otherWallets, wallet]
    }

    @action reset = () => {
        this.list = INITIAL_STATE.list;
        this.loading = INITIAL_STATE.loading;
    }
}

export default new WalletsStore();