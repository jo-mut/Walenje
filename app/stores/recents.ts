import { action, observable } from 'mobx';

const INITIAL = {
    list: [],
    loading: false
};

export class RecentsStore {

    @observable list: string[] = INITIAL.list;
    @observable loading: boolean = INITIAL.loading;

    @action isLoading(state: boolean) {
        this.loading = Boolean(state);
    }

    @action addAddress(address: string) {
        const index = this.list.findIndex(a => a === address);
        if (index > -1) return;
        this.list.push(address);
    }

    @action loadAddresses(addresses: string[]) {
        this.list = [];
        addresses.forEach(address => this.addAddress(address));
    }

    @action reset() {
        this.list = INITIAL.list;
        this.loading = INITIAL.loading;
    }
}

export default new RecentsStore();