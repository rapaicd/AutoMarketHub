import { Sequelize, DataTypes } from 'sequelize';
import { VehicleStatic } from '../utils/interfaces';

const Vehicle = (sequelize: Sequelize): VehicleStatic => {
  return <VehicleStatic>sequelize.define("vehicle", {
    name:{
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.STRING
    }
  });
};

export default Vehicle;