import axios from 'axios';
import { Url } from '../constants';
export {Url} from '../constants';

export function getPrice() {
    return axios.get(`${Url.CRYPTO_COMPARE}/data/price?fsym=ETH&tsyms=USD,EUR,JMD`)
}

export function getHistory(address: string) {
    return axios.get(`${Url.ETHERSCAN}?module=account&action=txlist&address=${address}`)
}