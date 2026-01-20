const Sequelize = require("sequelize");
const { Logger } = require("sequelize/lib/utils/logger");

const sequelize = new Sequelize("db_test", "postgres", "EsnsleP13", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("🆗 conectado a la base de datos"))
  .catch((err) => console.error("🚫 Error auth: ", err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("🌐 Base de datos sincronizada"))
  .catch((err) => console.error("🚫 Error Sync: ", err));

module.exports = sequelize;
