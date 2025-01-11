import { ITokenStore } from "@/interfaces/tokens";
import { action, observable } from "mobx";

const INITIAL_STATE = {
    tokens: []
}

export interface IToken {
    tokens: any []
}

export class TokenStore implements IToken {
    @observable tokens: any = INITIAL_STATE.tokens;

    @action addToken(token: ITokenStore) {
        this.tokens.push(token)
    }

    @action setTokens = (tokens: any[])  =>{
        this.tokens = tokens;
    }

    @action clearTokens() {
        this.tokens = [];
    }
}

export default new TokenStore();