import axios from 'axios';
import * as bitcoin from 'bitcoinjs-lib';
import { ChainNetworkConfig } from '../config/types';
import btcToSatoshis from './btcToSatoshis';

type TransactionPayload = {
  privateKeyWIF: string;
  toAddress: string;
  amount: number;
  networkConfig: ChainNetworkConfig;
};

export const createBitcoinTransaction = async ({ privateKeyWIF, toAddress, amount, networkConfig }: TransactionPayload): Promise<string | null> => {
  try {
    const amountSatoshis = btcToSatoshis(amount);
    const bitcoinNetwork = bitcoin.networks[networkConfig.network];
    const keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoinNetwork);

    const txBuilder = new bitcoin.TransactionBuilder(bitcoinNetwork);
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: bitcoinNetwork });
    const response = await axios.get(`${networkConfig.serviceURL}/address/${address}/utxo`);
    const utxos = response.data;

    // Add UTXOs as inputs to the transaction
    utxos.forEach(utxo => {
      txBuilder.addInput(utxo.txid, utxo.vout);
    });

    // Add the recipient's address and amount as an output
    txBuilder.addOutput(toAddress, amountSatoshis);

    // Sign each input with the sender's private key
    utxos.forEach((_, index) => {
      txBuilder.sign(index, keyPair);
    });

    // Build the transaction
    const tx = txBuilder.build();

    // Serialize the transaction
    return tx.toHex();
  } catch (error) {
    // :: LOG
    console.error(error.message);
    return null;
  }
};

export const broadcastBitcoinTransaction = async (txHex: string, basUrl: string): Promise<any> => {
  const tnx = await axios.post(`${basUrl}/tx`, txHex, {
    headers: { 'Content-Type': 'text/plain' },
  });

  return tnx.data;
};
