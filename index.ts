import express, { Express } from 'express';
require('dotenv').config();
import routes from './src/init/routes';
import localize from './src/init/localize';
import theApp from './src/init/theApp';

const app: Express = express();

const cors = require('cors');
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
theApp(app);
localize(app);
// db();
routes(app);

app.listen(3000, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${3000}`);
});
export default app;
