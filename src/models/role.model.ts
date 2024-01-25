import { Sequelize, DataTypes, } from 'sequelize';
import { RoleStatic, UserStatic } from '../utils/interfaces';

const Role = (sequelize: Sequelize): RoleStatic => {
    return <RoleStatic>sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.ENUM("user", "admin", "moderator")
        },
    }, {
        timestamps: false,
    });
};

export default Role;