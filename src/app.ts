import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import db from "./models/db";
import userRouter from './routes/users.routes'

const app: Express = express();

dotenv.config();

const corsOptions = {
  origin: 'http://localhost:8080/'
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

app.get("/", (req: Request, res: Response) => {
  res.send("Ok");
});

app.use('/users',userRouter)


export default app;