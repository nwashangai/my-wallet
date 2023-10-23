import { ChainNetworkConfig } from '../config/types';

export type TETHTransaction = {
  from: string;
  to: string;
  value: string;
  gas?: bigint;
  gasPrice?: bigint;
};

export type Wallet = {
  address: string;
  privateKey: string;
  privateKeyWIF?: string;
  xpub?: string;
  mnemonic?: string;
};

export type WalletOptions = {
  network: ChainNetworkConfig;
  wallet?: Wallet;
  address?: string;
  privateKey?: string;
};
