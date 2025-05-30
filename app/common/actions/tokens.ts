import { Token as TokenService } from "@/app/services";
import { tokens as TokenStore } from "@/app/stores";
import { ITokenStore } from "@/interfaces/tokens";

export async function loadTokens(store = TokenStore, service = TokenService) {
    const tokens: ITokenStore[] = await service.loadTokens();
    tokens.map(token => {
        store.addToken(token)
    })
}

export async function saveTokens(tokens: ITokenStore[], service = TokenService) {
    await service.saveTokens(tokens);
}

export async function addTokenDetails(tokenDetail: any, store = TokenStore) {
    store.addTokenDetails(tokenDetail, tokenDetail.name);
}