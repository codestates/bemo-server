const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "bemo_development",
    host: "127.0.0.1",
    dialect: "mysql"
  },

  production: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "bemo",
    host: "first-project-bemo.cuj6krjod3k4.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
    port: '13306'
  }
}
