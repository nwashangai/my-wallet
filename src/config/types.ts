export enum BlockChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type ChainNetworkConfig = {
  network: BlockChainNetwork;
  serviceURL: string;
  confirmationTarget: number;
  contractAddress?: string;
  tokenContractABI?: any;
};

export type CryptoConfigType = {
  [network: string]: ChainNetworkConfig;
};
