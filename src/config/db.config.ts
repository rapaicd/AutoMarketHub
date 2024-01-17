const DBConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "used_car_for_sale",
  // dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default DBConfig;