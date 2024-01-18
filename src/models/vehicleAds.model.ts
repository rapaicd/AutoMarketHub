import { Sequelize, DataTypes } from 'sequelize';
import { VehicleAdStatic } from '../utils/interfaces';

const VehicleAd = (sequelize: Sequelize): VehicleAdStatic => {
  return <VehicleAdStatic>sequelize.define("vehicle_ad", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('car','bike'),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER,
      validate:{
        isInt:true
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        isDecimal:true
      }
    }
  });
};

export default VehicleAd;