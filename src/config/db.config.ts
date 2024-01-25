import { Sequelize, Options } from 'sequelize';
import { DBConfigProps } from '../utils/interfaces'
import User from '../models/user.model';
import VehicleAd from '../models/vehicleAd.model';
import Role from '../models/role.model';

const sequelizeOptions: Options = {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
};

const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASSWORD || '',
    sequelizeOptions
);

const db: DBConfigProps = {
    sequelize,
    user: User(sequelize),
    vehicleAd: VehicleAd(sequelize),
    role: Role(sequelize),
};

db.user.hasMany(db.vehicleAd, {
    as: 'vehicleAds',
    foreignKey: {
        name: 'userId',
        allowNull: false,
    }
});
db.vehicleAd.belongsTo(db.user);
db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});


export default db;