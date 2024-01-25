import { Sequelize, DataTypes, } from 'sequelize';
import { UserStatic } from '../utils/interfaces';

const User = (sequelize: Sequelize): UserStatic => {
  return <UserStatic>sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: {
          msg:"Frist Name must has only letters"
        },
        notEmpty: true,
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: {
          msg:"Last name must has only letters"
        },
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
      }
    },
    phone_number: {
      type: DataTypes.STRING
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
};

export default User;