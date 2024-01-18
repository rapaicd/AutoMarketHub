import { BuildOptions, Model, Sequelize } from "sequelize";
import { Op } from 'sequelize';
export interface UserAttributes {
    first_name: string;
    last_name: string;
    phone_number: string
}

export interface VehicleAdAttributes {
    type: string;
    color: string;
    year: string;
    userId: Number;
}

type UserModel = Model & UserAttributes;
export type UserStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

type VehicleModel = Model & VehicleAdAttributes;
export type VehicleAdStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): VehicleModel;
};

export interface DBConfigProps {
    sequelize: Sequelize;
    user: UserStatic;
    vehicleAd: VehicleAdStatic;
}

export interface Query {
    name?: string;
    type?: string;
    color?: string;
    yearMax?: number;
    yearMin?: number;
    priceMax?: number;
    priceMin?: number;
}

export interface ConditionQuery {
    name?: { [Op.like]: string; };
    type?: string;
    color?: { [Op.like]: string; };
    year?: {};
    price?: {};
}
