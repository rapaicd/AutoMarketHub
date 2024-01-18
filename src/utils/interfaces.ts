import { BuildOptions, Model, Sequelize } from "sequelize";

interface UserProps {
    first_name: string;
    last_name: string;
    phone_nuumber: string
}

interface VehicleProps {
    type: string;
    color: string;
    year: string
}

type UserModel = Model & UserProps;
export type UserStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

type VehicleModel = Model & VehicleProps;
export type VehicleStatic = typeof Model & {
    new(values?: Record<string, unknown>, options?: BuildOptions): VehicleModel;
};

export interface DBConfigProps {
    sequelize: Sequelize;
    user: UserStatic;
    vehicle: VehicleStatic;
}