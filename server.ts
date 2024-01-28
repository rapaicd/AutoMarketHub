import express, { Express } from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './src/config/db.config';
import userRouter from './src/routes/user.routes';
import vehicleAdRouter from './src/routes/vehicleAd.routes';
import authRouter from './src/routes/auth.routes';
import { initial } from './src/utils/helper';

const app: Express = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.ORIGIN_URL,
};
app.use(cors(corsOptions));
app.use(express.json());

//if force set to true -> Drop and re-sync db
const force = false;
db.sequelize.sync({ force })
  .then(() => {
    force && initial();
    app.listen(port, () => {
      console.log(`[server]: Server is running on port: ${port}`);
    });
  })
  .catch((err: Error) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/vehicleAds', vehicleAdRouter);
app.use('*', (req, res) => {
  res.status(404).send({ errorMessage: 'Route not found' });
});
export default app;
