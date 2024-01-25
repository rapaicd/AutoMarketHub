import { BuildOptions, Model, Sequelize } from "sequelize";
import { Op } from 'sequelize';
export interface UserAttributes {
    id:number;
    first_name: string;
    last_name: string;
    phone_number: string;
    password:string;
    email:string;
}

export interface VehicleAdAttributes {
    //id?
    type: string;
    color: string;
    year: string;
    userId: Number;
}

export interface RoleAttributes {
    id:number;
    name: string;
}

type UserModel = Model & UserAttributes;
export type UserStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

type VehicleModel = Model & VehicleAdAttributes;
export type VehicleAdStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): VehicleModel;
};

type RoleModel = Model & RoleAttributes;
export type RoleStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): RoleModel;
};

export interface DBConfigProps {
    sequelize: Sequelize;
    user: UserStatic;
    vehicleAd: VehicleAdStatic;
    role: RoleStatic;
}

export interface Query {
    name?: string;
    type?: string;
    color?: string;
    year_to?: number;
    year_from?: number;
    price_max?: number;
    price_min?: number;
}

export interface ConditionQuery {
    name?: { [Op.like]: string; };
    type?: string;
    color?: { [Op.like]: string; };
    year?: {};
    price?: {};
}

export interface EmailMessageAttributes{
    from: string | undefined;
    to: string | undefined;
    subject: string;
    html:string;
}

export type PurchaserDataType = string | undefined; 
