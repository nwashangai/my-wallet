export enum BlockChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type ChainNetworkConfig = {
  network: BlockChainNetwork;
  balanceURL: string;
  confirmationTarget: number;
};

export type CryptoConfigType = {
  [network: string]: ChainNetworkConfig;
};
