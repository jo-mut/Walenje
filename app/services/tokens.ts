import { Token } from "../constants";
import * as StorageService from './storage';

export async function getTokens() {
    return await StorageService.getItem(Token.TOKEN_KEY);
}

export async function addToken(tokens: string []) {
    return await StorageService.setItem(Token.TOKEN_KEY, JSON.stringify(tokens));
}