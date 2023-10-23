import crypto from 'crypto';
import { Wallet } from './types';

type KeyEncryption = {
  iv: string;
  encryptedKey: string;
};

type Constructor = {
  wallet?: Wallet;
};

abstract class WalletBase {
  protected wallet: Wallet;
  private algorithm = 'aes-256-ctr';
  private iv = crypto.randomBytes(16);
  private secretKey = process.env.SIGN_KEY;

  constructor({ wallet }: Constructor = {}) {
    if (wallet) {
      this.wallet = wallet;
    }
  }

  abstract createNewWallet(): void;

  // Common method to get the wallet's balance
  abstract getBalance(): Promise<number | string>;

  // Common method to send funds to another address
  abstract sendFunds(toAddress: string, amount: number): Promise<string | null>;

  getWalletInfo() {
    return this.wallet;
  }

  encrypt(payload, isObject?): KeyEncryption {
    const payloadToEncrypt = isObject ? JSON.stringify(payload) : payload;

    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);

    const encrypted = Buffer.concat([cipher.update(payloadToEncrypt), cipher.final()]);

    return {
      iv: this.iv.toString('hex'),
      encryptedKey: encrypted.toString('hex'),
    };
  }

  decrypt(cipherObj: KeyEncryption, isObject = false) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(cipherObj.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(cipherObj.encryptedKey, 'hex')), decipher.final()]);

    return isObject ? decrpyted.toJSON() : decrpyted.toString();
  }
}

export default WalletBase;
