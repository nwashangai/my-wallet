import { BlockChainNetwork, CryptoConfigType } from './types';

export const etheriumConfig: CryptoConfigType = {
  testnet: {
    network: BlockChainNetwork.TESTNET,
    serviceURL: `https://sepolia.infura.io/v3/${process.env.INFURA_ID}`,
    confirmationTarget: 2,
  },
  mainnet: {
    network: BlockChainNetwork.MAINNET,
    serviceURL: `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`,
    confirmationTarget: 4,
  },
};
