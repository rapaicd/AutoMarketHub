import { Sequelize, DataTypes,  } from 'sequelize';
import {UserStatic } from '../utils/interfaces';

const User = (sequelize: Sequelize): UserStatic => {
  return <UserStatic>sequelize.define("user", {
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    }
  });
};

export default User;