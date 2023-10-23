import { BlockChainNetwork, CryptoConfigType } from './types';

export const bitcoinConfig: CryptoConfigType = {
  testnet: {
    network: BlockChainNetwork.TESTNET,
    serviceURL: 'https://blockstream.info/testnet/api',
    confirmationTarget: 2,
  },
  mainnet: {
    network: BlockChainNetwork.MAINNET,
    serviceURL: 'https://blockstream.info/api',
    confirmationTarget: 4,
  },
};
