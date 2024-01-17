import { Sequelize, Options } from 'sequelize';
import DBConfig from "../config/db.config";
import { DBConfigProps } from '../utils/interfaces'
import User from './users.model';
import Vehicle from './vehicles.model';

const sequelizeOptions: Options = {
    host: DBConfig.HOST,
    dialect: 'mysql',
    pool: {
        max: DBConfig.pool.max,
        min: DBConfig.pool.min,
        acquire: DBConfig.pool.acquire,
        idle: DBConfig.pool.idle
    }
};

const sequelize = new Sequelize(
    DBConfig.DB,
    DBConfig.USER,
    DBConfig.PASSWORD,
    sequelizeOptions
);

const db: DBConfigProps = {
    Sequelize,
    sequelize,
    user: User(sequelize),
    vehicle: Vehicle(sequelize),
};

export default db;