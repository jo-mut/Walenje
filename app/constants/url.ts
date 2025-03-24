export const COINTSTATS = "https://openapiv1.coinstats.app/coins/price/";
export const ETHERSCAN = (process.env.NODE_ENV === 'production') ? process.env.ETHERSCAN_MAINNET : process.env.ETHERSCAN_SEPOLIA
