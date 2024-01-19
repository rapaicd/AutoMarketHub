import express, { Express } from "express";
import 'dotenv/config';
import cors from 'cors';
import db from "./utils/db";
import userRouter from './routes/users.routes'
import vehicleAdRouter from './routes/vehicleAds.routes'

const app: Express = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.originUrl,
};
app.use(cors(corsOptions));
app.use(express.json());

// db.sequelize.sync({ force: false }) //Drop and re-sync db
db.sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running on port: ${port}`);
    });
  })
  .catch((err: Error) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use('/users', userRouter)
app.use('/vehicleAds', vehicleAdRouter) 

export default app;