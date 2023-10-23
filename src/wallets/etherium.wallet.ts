import Web3 from 'web3';
import { ChainNetworkConfig } from '../config/types';
import WalletBase from './walletBase';
import { TETHTransaction, WalletOptions } from './types';

class EtheriumWallet extends WalletBase {
  private networkConfig: ChainNetworkConfig;
  private web3: Web3;

  constructor({ wallet, network }: WalletOptions) {
    super({ wallet });
    this.networkConfig = network;
    console.log(network.serviceURL);

    this.web3 = new Web3(network.serviceURL);

    if (wallet) {
      this.wallet = wallet;
    }
  }

  createNewWallet() {
    const account = this.web3.eth.accounts.create();

    this.wallet = {
      xpub: Buffer.from(account.address, 'utf8').toString('hex'),
      privateKey: account.privateKey,
      address: account.address,
    };

    return this.wallet;
  }

  async getBalance(): Promise<string> {
    try {
      const balanceInWei = await this.web3.eth.getBalance(this.wallet.address);

      return this.web3.utils.fromWei(balanceInWei, 'ether');
    } catch (error) {
      // ::LOG
      return '0';
    }
  }

  async sendFunds(toAddress: string, amount: number): Promise<any> {
    try {
      const amountInWei = this.web3.utils.toWei(amount, 'ether');
      const tnx: TETHTransaction = { from: this.wallet.address, to: toAddress, value: amountInWei };
      const gasPriceWei = await this.web3.eth.getGasPrice();
      const gasLimit = await this.web3.eth.estimateGas(tnx);
      const transaction: TETHTransaction = {
        ...tnx,
        gas: gasLimit,
        gasPrice: gasPriceWei,
      };

      const signedTnx = await this.web3.eth.accounts.signTransaction(transaction, this.wallet.privateKey);

      return new Promise((resolve, rejects) => {
        this.web3.eth
          .sendSignedTransaction(signedTnx.rawTransaction)
          .on('receipt', receipt => {
            console.log(receipt);
            resolve(receipt);
          })
          .on('error', error => {
            rejects(error);
          });
      });
    } catch (error) {
      // :: LOG
      console.log(error.message);

      return null;
    }
  }
}

export default EtheriumWallet;
