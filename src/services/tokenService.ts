import { ethers } from 'ethers';

const infuraProjectId = '22158a6c78f74359a46bd8c2c03988ca';
const provider = new ethers.providers.InfuraProvider('mainnet', infuraProjectId);


// DAI contract details
const DAI_ABI = [
  // Only include the ABI entries you need
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (boolean)",
];

const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';

// Create a contract instance
const daiContract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, provider);

// Function to get the balance of a given address
export async function getTokenBalance(address: any) {
  try {
    const balance = await daiContract.balanceOf(address);
    console.log('Token Balance:', ethers.utils.formatUnits(balance, 18)); // DAI has 18 decimals
    return ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error fetching token balance:', error);
  }
}

// Function to transfer tokens
export async function sendTokens(signer: any, to: any, amount: any) {
  try {
    const daiWithSigner = daiContract.connect(signer);
    const tx = await daiWithSigner.transfer(to, ethers.utils.parseUnits(amount, 18));
    await tx.wait(); // Wait for transaction to be mined
    console.log('Transaction successful:', tx);
    return tx;
  } catch (error) {
    console.error('Error sending tokens:', error);
  }
}