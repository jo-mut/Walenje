import { ethers } from "ethers";
import { action, observable } from "mobx"

const INITIAL_STATE = {
    list: [],
    loading: false,
}


export class WalletsStore {
    @observable list: any[] = INITIAL_STATE.list;
    @observable loading = INITIAL_STATE.loading;

    @action isLoading = (state: boolean) =>{
        this.loading = Boolean(state)
    }

    @action addWallet = (wallet: any) => {
        console.log(wallet)
        if(!(wallet instanceof ethers.Wallet)) throw new Error('Invalid Wallet');
        // wallet.name = walletName;
        // wallet.description = walletDescription;
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