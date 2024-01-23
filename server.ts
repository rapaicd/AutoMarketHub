import express, { Express } from 'express';
import 'dotenv/config';
import cors from 'cors';
import db from './src/config/db.config';
import userRouter from './src/routes/user.routes';
import vehicleAdRouter from './src/routes/vehicleAd.routes';

const app: Express = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.ORIGIN_URL,
};
app.use(cors(corsOptions));
app.use(express.json());

//Drop and re-sync db
// db.sequelize.sync({ force: false })
db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running on port: ${port}`);
    });
  })
  .catch((err: Error) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.use('/users', userRouter);
app.use('/vehicleAds', vehicleAdRouter);
app.use('*', (req, res) => {
  res.status(404).send({ errorMessage: 'Route not found' });
});
export default app;
