import TronWeb from 'tronweb';
import { ChainNetworkConfig } from '../config/types';
import WalletBase from './walletBase';
import { WalletOptions } from './types';
const crypto = require('crypto');
const sdk = require('api')('@tron/v4.7.3#19cpcn4pollds6o2o');

class TronWallet extends WalletBase {
  private networkConfig: ChainNetworkConfig;
  private tronWeb: any;

  constructor({ wallet, network }: WalletOptions) {
    super({ wallet });
    this.networkConfig = network;

    if (wallet) {
      this.wallet = wallet;
      this.tronWeb = new TronWeb(network.serviceURL, network.serviceURL, network.serviceURL, wallet.privateKey);
    }
  }

  createNewWallet() {
    const privateKey = crypto.randomBytes(32).toString('hex');
    const tronWeb = new TronWeb(this.networkConfig.serviceURL, this.networkConfig.serviceURL, this.networkConfig.serviceURL, privateKey);
    const address = tronWeb.address.fromPrivateKey(privateKey);

    this.wallet = {
      privateKey,
      address,
    };

    return this.wallet;
  }

  async getBalance(): Promise<number> {
    try {
      const contract = await this.tronWeb.contract().at(this.networkConfig.contractAddress);
      const balanceInTokenWei = await contract.balanceOf(this.wallet.address).call();

      // Convert Sun to USDT (if decimals = 1e6 or 1,000,000)
      const balanceInTokenSun = balanceInTokenWei.div(1e6);

      return balanceInTokenSun.toString();
    } catch (error) {
      // ::LOG
      return 0;
    }
  }

  async sendFunds(toAddress: string, amount: number): Promise<string | null> {
    try {
      const contract = await this.tronWeb.contract().at(this.networkConfig.contractAddress);

      // Get the current energy price (fee) from the network
      const energy = await sdk.estimateenergy({
        owner_address: this.wallet.address,
        contract_address: this.networkConfig.contractAddress,
        function_selector: 'balanceOf(address)',
        parameter: '000000000000000000000000a614f803b6fd780986a42c78ec9c7f77e6ded13c',
        visible: true,
      });
      const feeLimit = energy.data.energy_required * 100000;
      const usdtValueInSun = amount * Math.pow(10, 6);

      // Build the transaction data
      const options = {
        feeLimit,
        callValue: 0, // No TRX value involved
      };

      const transaction = contract.transfer(toAddress, usdtValueInSun);

      const transferTransaction = await transaction.send(options);

      return transferTransaction;
    } catch (error) {
      // :: LOG
      console.log(error);

      return null;
    }
  }
}

export default TronWallet;
