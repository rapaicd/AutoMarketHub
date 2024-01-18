import { Sequelize, Options } from 'sequelize';
import DBConfig from "../config/db.config";
import { DBConfigProps } from '../utils/interfaces'
import User from './users.model';
import VehicleAd from './vehicleAds.model';

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
    sequelize,
    user: User(sequelize),
    vehicleAd: VehicleAd(sequelize),
};

db.user.hasMany(db.vehicleAd, {
    as: 'vehicleAds',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    }
});
db.vehicleAd.belongsTo(db.user);

export default db;