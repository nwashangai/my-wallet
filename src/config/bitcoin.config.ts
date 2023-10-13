import { BlockChainNetwork, CryptoConfigType } from './types';

export const bitcoinConfig: CryptoConfigType = {
  testnet: {
    network: BlockChainNetwork.TESTNET,
    balanceURL: 'https://blockstream.info/testnet/api',
    confirmationTarget: 2,
  },
  mainnet: {
    network: BlockChainNetwork.MAINNET,
    balanceURL: 'https://blockchain.info/q/addressbalance',
    confirmationTarget: 4,
  },
};
