import { Recents } from '../constants';
import * as StorageService from './storage';

export async function loadRecentAddresses() {
    const recents = await StorageService.getItem(Recents.STORAGE_KEY);
    return recents ? JSON.parse(recents) : [];
}

export async function saveRecentAddresses(recents: string []) {
    return StorageService.setItem(Recents.STORAGE_KEY, JSON.stringify(recents));
}

export async function deleteRecentAddress() {
    return StorageService.deleteItem(Recents.STORAGE_KEY);
}