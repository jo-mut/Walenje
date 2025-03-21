import { ITokenStore } from "@/interfaces/tokens";
import { Token } from "../constants";
import * as StorageService from './storage';

export async function loadTokens() {
    const tokens = await StorageService.getItem(Token.TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : [];
}

export async function saveTokens(tokens: ITokenStore[]) {
    console.log("save tokens into an array", tokens)
    return await StorageService.setItem(Token.TOKEN_KEY, JSON.stringify(tokens));
}

export function deleteToken() {
    return StorageService.deleteItem(Token.TOKEN_KEY);
}   