import { ITokenStore } from "@/interfaces/tokens";
import { action, observable } from "mobx";

const INITIAL_STATE = {
    tokens: []
}

export interface IToken {
    tokens: ITokenStore[]
}

export class TokenStore implements IToken {
    @observable tokens: ITokenStore[] = INITIAL_STATE.tokens;

    @action addToken(token: ITokenStore) {
        this.tokens.push(token)
    }

    @action clearTokens() {
        this.tokens = [];
    }
}

export default new TokenStore();