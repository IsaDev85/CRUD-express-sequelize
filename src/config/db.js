const Sequelize = require("sequelize");
require("dotenv").config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
);

sequelize
  .authenticate()
  .then(() => console.log("🆗 conectado a la base de datos"))
  .catch((err) => console.error("🚫 Error auth: ", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("🌐 Base de datos sincronizada"))
  .catch((err) => console.error("🚫 Error Sync: ", err));

module.exports = sequelize;
