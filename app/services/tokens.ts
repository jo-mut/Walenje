import { Token } from "../constants";
import * as StorageService from './storage';

export async function loadTokens() {
    return await StorageService.getItem(Token.TOKEN_KEY);
}

export async function saveTokens(tokens: string []) {
    return await StorageService.setItem(Token.TOKEN_KEY, JSON.stringify(tokens));
}

export function deleteToken() {
    return StorageService.deleteItem(Token.TOKEN_KEY);
}   