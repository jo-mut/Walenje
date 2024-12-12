import { BigNumber, utils } from "ethers";

const DEFAULT_GASLIMIT = 21000;
const DEFAULT_GAS_PRICE = 4000000000; // 4 gewi

export const createTransaction = (to: string, value: string, options?: any, gasLimit = DEFAULT_GASLIMIT) => {
    if (!value) throw new Error('The transaction value is required');
    else if (!(Number(value) > 0)) throw new Error('The transaction value is invalid');
    else if (isNaN(gasLimit)) gasLimit = DEFAULT_GASLIMIT;
    const gasPrice = DEFAULT_GAS_PRICE;
    const v = utils.parseEther(value);
    return { gasPrice, ...options, to, gasLimit, v }
}

export const isValidTransaction = (transaction: any) => {
    return transaction instanceof Object
        && Number(transaction.value) > 0
        && Number(transaction.gasLimit) > 0
    && typeof transaction.to === 'string';
}