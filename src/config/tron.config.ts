import { BlockChainNetwork, CryptoConfigType } from './types';

export const tronConfig: CryptoConfigType = {
  testnet: {
    network: BlockChainNetwork.TESTNET,
    serviceURL: `https://api.shasta.trongrid.io`,
    confirmationTarget: 2,
    contractAddress: 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs',
  },
  mainnet: {
    network: BlockChainNetwork.MAINNET,
    serviceURL: `https://api.trongrid.io`,
    confirmationTarget: 4,
    contractAddress: 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs',
  },
};
