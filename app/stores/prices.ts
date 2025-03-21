import { action, observable } from 'mobx';

const INITIAL = {
    usd: 0,
    eur: 0,
    jmd: 0,
    loading: false
};

export class PricesStore {

    @observable usd = INITIAL.usd;
    @observable eur = INITIAL.eur;
    @observable jmd = INITIAL.jmd;
    @observable loading = INITIAL.loading;

    validateInput(input: number) {
        if (isNaN(input) || typeof input !== 'number') throw new Error('The input is NaN');
    }

    @action isLoading(state: boolean) {
        this.loading = Boolean(state);
    }

    @action setUSDRate(rate: number) {
        this.validateInput(rate);
        this.usd = Number(rate);
    }
    
    @action setEURRate(rate: number) {
        this.validateInput(rate);
        this.eur = Number(rate);
    }
    
    @action setJMDRate(rate: number) {
        this.validateInput(rate);
        this.jmd = Number(rate);
    }

    @action reset() {
        this.usd = INITIAL.usd;
        this.eur = INITIAL.eur;
        this.jmd = INITIAL.jmd;
        this.loading = INITIAL.loading;
    }
}

export default new PricesStore();