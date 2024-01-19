import { Sequelize, Options } from 'sequelize';
import { DBConfigProps } from './interfaces'
import User from '../models/users.model';
import VehicleAd from '../models/vehicleAds.model';

const sequelizeOptions: Options = {
    host: process.env.DBHOST || 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};

const sequelize = new Sequelize(
    process.env.dbName || '',
    process.env.dbUser || '',
    process.env.dbPassword || '',
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