import axios from 'axios';
// import bitcore from 'bitcore-lib';
// import bitcoinTransaction from 'bitcoin-transaction';
// import bitcoinaddress from 'bitcoin-address';
// import Mnemonic from 'bitcore-mnemonic';
import * as bitcoin from 'bitcoinjs-lib';
import { ChainNetworkConfig } from '../config/types';
import WalletBase from './walletBase';
import { WalletOptions } from './types';
import { createBitcoinTransaction, broadcastBitcoinTransaction } from '../helpers/sendBitcoinTransaction';

class BitcoinWallet extends WalletBase {
  private networkConfig: ChainNetworkConfig;

  constructor({ wallet, network }: WalletOptions) {
    super({ wallet });
    this.networkConfig = network;

    if (wallet) {
      this.wallet = wallet;
    }
  }

  createNewWallet() {
    const keyPair = bitcoin.ECPair.makeRandom({ network: bitcoin.networks[this.networkConfig.network] });
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: bitcoin.networks[this.networkConfig.network] });
    console.log(keyPair.network);

    this.wallet = {
      xpub: keyPair.publicKey.toString('hex'),
      privateKey: keyPair.privateKey.toString('hex'),
      privateKeyWIF: keyPair.toWIF(),
      address,
    };

    return this.wallet;
  }

  async getBalance(): Promise<number> {
    try {
      const balanceInfo = await axios.get(`${this.networkConfig.balanceURL}/address/${this.wallet.address}`);
      const satoshis = parseInt(balanceInfo.data['chain_stats']['funded_txo_sum']);
      const balanceBTC = satoshis / 1e8; // Convert from satoshis to BTC
      return balanceBTC;
    } catch (error) {
      // ::LOG
      return 0;
    }
  }

  async sendFunds(toAddress: string, amount: number): Promise<string | null> {
    try {
      const txHex = await createBitcoinTransaction({
        privateKeyWIF: this.wallet.privateKeyWIF,
        toAddress,
        amount,
        networkConfig: this.networkConfig,
      });

      const transaction = await broadcastBitcoinTransaction(txHex, this.networkConfig.balanceURL);

      return transaction;
    } catch (error) {
      // :: LOG
      console.log(error.message);

      return null;
    }
  }
}

export default BitcoinWallet;
