// import { Account, TransactionConfig, TransactionReceipt, BlockNumber, } from 'web3-core';
// import { BlockTransactionObject, Transaction } from 'web3-eth';
import Web3, { TransactionReceipt } from 'web3';
import { convertStringToNumSafely } from '../../utils/number';


type TransactionProps = {
    addressFrom: string;
    addressTo: string;
    amount: string;
    privateKey: string;
}

export type Web3Instance = {
    isValidAddress: (address: string) => boolean;
    privateKeyToAccount: (privateKey: string) => any;
    getBalance: (address: string) => Promise<string>;
    getLatestBlock: () => Promise<any>;
    getBlock: (
        blockHashOrBlockNumber: any,
    ) => Promise<any>;
    getTransaction: (hash: string) => Promise<any>
    getTrasactionCount: (address: string) => Promise<number>;
    estimateGasPrice: (address: string, amount: string) => Promise<string | null>;
    sendTransaction: (
        props: TransactionProps
    ) => Promise<any | null>;
};

export const web3LibBuilder = (web3Instance: Web3): Web3Instance => {
    const privateKeyToAccount = (privateKey: string,): any =>
        web3Instance.eth.accounts.privateKeyToAccount(privateKey);

    const getBalance = async (address: string): Promise<string> => {
        const balance = await web3Instance.eth.getBalance(address);
        return web3Instance.utils.fromWei(balance, 'ether');
    }

    const estimateGasPrice = async (
        address: string,
        amount: string,
    ): Promise<string> => {
        const gasPriceText = await web3Instance.eth.getGasPrice();
        const gasPrice = convertStringToNumSafely(gasPriceText);
        const amountValue = web3Instance.utils.toWei(amount, 'ether');
        const estimateGas = await web3Instance.eth.estimateGas({
            from: address,
            value: amountValue,
        });

        return web3Instance.utils.fromWei(String(gasPrice * estimateGas), 'ether');
    }

    const isValidAddress = (address: string) =>
        web3Instance.utils.isAddress(address);

    const getLatestBlock = () =>
        web3Instance.eth.getBlock('latest', true);

    const getBlock = (blockHashOrBlockNumber: any) =>
        web3Instance.eth.getBlock(blockHashOrBlockNumber, true);

    const getTrasactionCount = (address: string) =>
        web3Instance.eth.getTransactionCount(address);

    const getTransaction = (transactionHash: string) =>
        web3Instance.eth.getTransaction(transactionHash);

    const sendTransaction = async (
        props: TransactionProps,
    ): Promise<TransactionReceipt | null> => {
        const nonce = await web3Instance.eth.getTransactionCount(
            props.addressFrom, 'latest',
        );

        const valueToWei = web3Instance.utils.toWei(props.amount, 'ether');
        const gasPrice = await web3Instance.eth.getGasPrice();
        const estimateGas = await web3Instance.eth.estimateGas({
            from: props.addressFrom,
            value: valueToWei,
        });

        const rawTransaction: any = {
            from: props.addressFrom,
            to: props.addressTo,
            value: valueToWei,
            nonce,
            gasPrice,
            gas: estimateGas
        };

        const signedTransaction = await web3Instance.eth.accounts.signTransaction(
            rawTransaction,
            props.privateKey,
        );

        if (!signedTransaction.rawTransaction) {
            throw new Error('Transaction signature failed');
        }

        return web3Instance.eth.sendSignedTransaction(
            signedTransaction.rawTransaction,
        )
    };

    return {
        isValidAddress,
        privateKeyToAccount,
        getBalance,
        estimateGasPrice,
        getTrasactionCount,
        getTransaction,
        sendTransaction,
        getLatestBlock,
        getBlock
    }
};
