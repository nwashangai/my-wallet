import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
// import db from './src/init/db';
import theApp from './src/init/theApp';
// import Bitcoin from './src/wallets/bitcoin.wallet';
// import { bitcoinConfig } from './src/config/bitcoin.config';
// import { BlockChainNetwork } from './src/config/types';

dotenv.config();
const app: Express = express();

const cors = require('cors');
const corsOptions = {
  origin: '*',
};

// const bitcoin = new Bitcoin({
//   wallet: {
//     xpub: '03a4ad1a09c94cbafa3b1897d2d237dd96aaaa2e62b29780465676dccb97dab258',
//     privateKey: '092838d086307a8726840c45b9eb14e12a22c9e5d2e4ec5311367af31bc2e689',
//     privateKeyWIF: 'cMtW4aHzJiaokidqB8DkMNd71NMD39neWQBMoNFvXbSPkjeABnQJ',
//     address: 'mhnzv6fFa9DJ9AM41Rt54kAhnwu576Jvpy',
//   },
//   network: bitcoinConfig[BlockChainNetwork.TESTNET],
// });

// console.log(bitcoin.createNewWallet());
// bitcoin.sendFunds('mohjSavDdQYHRYXcS3uS6ttaHP8amyvX78', 0.00005048);

// bitcoin.createTransaction('mohjSavDdQYHRYXcS3uS6ttaHP8amyvX78', 0.0008).then(balance => console.log('====>  ', balance));

app.use(cors(corsOptions));
theApp(app);
localize(app);
// db();
routes(app);

app.listen(3000, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${3000}`);
});
export default app;
