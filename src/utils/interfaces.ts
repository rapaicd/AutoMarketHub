import { BuildOptions, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    first_name: string;
    last_name: string;
    phone_number: string
}

export interface VehicleAttributes {
    type: string;
    color: string;
    year: string
}

export type UserModel = Model & UserAttributes;
export type UserStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

type VehicleModel = Model & VehicleAttributes;
export type VehicleStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): VehicleModel;
};

export interface DBConfigProps {
    sequelize: Sequelize;
    user: UserStatic;
    vehicle: VehicleStatic;
}