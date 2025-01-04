import { BigNumber, utils } from "ethers";

const DEFAULT_GASLIMIT = 21000;
const DEFAULT_GAS_PRICE = 4000000000; // 4 gewi

export const createTransaction = (to: string, amount: string, options?: any, gasLimit = DEFAULT_GASLIMIT) => {
    if (!amount) throw new Error('The transaction value is required');
    else if (!(Number(amount) > 0)) throw new Error('The transaction value is invalid');
    else if (isNaN(gasLimit)) gasLimit = DEFAULT_GASLIMIT;
    const gasPrice = DEFAULT_GAS_PRICE;
    const value = utils.parseEther(amount);
    return { gasPrice, ...options, to, gasLimit, value }
}

export const isValidTransaction = (transaction: any) => {
    return transaction instanceof Object
        && Number(transaction.value) > 0
        && Number(transaction.gasLimit) > 0
    && typeof transaction.to === 'string';
}