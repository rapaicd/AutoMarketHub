import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./models/db";
import userRouter from './routes/users.routes'
import vehicleAdRouter from './routes/vehicleAds.routes'

const app: Express = express();

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));

app.use(express.json());

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err: Error) => {
    console.log("Failed to sync db: " + err.message);
  });


// set force to true for drop all tables
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use('/users', userRouter)
app.use('/vehicleAds', vehicleAdRouter) 

export default app;