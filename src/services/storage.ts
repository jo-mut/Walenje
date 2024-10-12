import SensitiveInfoStorage from 'react-native-sensitive-info';
import {Storage} from '../constants';

export function getItem(key: any) {
    return SensitiveInfoStorage.getItem(key, Storage.CONFIG).then(item => item || '');
}

export function setItem(key: any, value: any) {
    return SensitiveInfoStorage.setItem(key, value || '', Storage.CONFIG);
}

export function deleteItem(key: any) {
    return SensitiveInfoStorage.deleteItem(key, Storage.CONFIG);
}