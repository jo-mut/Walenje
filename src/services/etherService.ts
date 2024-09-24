import {ethers} from 'ethers'

const infuraProjectId = '22158a6c78f74359a46bd8c2c03988ca';
const provider = new ethers.providers.InfuraProvider('mainnet', infuraProjectId);

export async function getLatestBlock() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log('Latest block number:', blockNumber);
        return blockNumber;
    } catch(error) {
        console.log('Error fetching block number:', error);
    }
}