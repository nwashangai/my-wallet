export enum BlockChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type ChainNetworkConfig = {
  network: BlockChainNetwork;
  serviceURL: string;
  confirmationTarget: number;
};

export type CryptoConfigType = {
  [network: string]: ChainNetworkConfig;
};
