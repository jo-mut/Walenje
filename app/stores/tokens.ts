import { ITokenStore } from "@/interfaces/tokens";
import { action, observable } from "mobx";

export interface IToken {
    tokens: ITokenStore[]
    tokenDetails: any[]
}

const INITIAL_STATE = {
    tokens: [],
    tokenDetails: []
}

export class TokenStore implements IToken {
    @observable tokens: ITokenStore[] = INITIAL_STATE.tokens;
    @observable tokenDetails: any[] = INITIAL_STATE.tokenDetails;

    @action addToken(token: ITokenStore) {
        this.tokens.push(token)
    }

    @action addTokenDetails(details: any, name: string) {
        if (this.tokenDetails.length > 0) {
            this.tokenDetails.map(d => {
                if (d.name !== name) {
                    this.tokenDetails.push(details)
                }
            })
        } else {
            console.log(details)
            this.tokenDetails.push(details)
        }

    }

    @action clearTokens() {
        this.tokens = [];
    }

    @action reset() {
        this.tokens = INITIAL_STATE.tokens;
    }
}

export default new TokenStore();