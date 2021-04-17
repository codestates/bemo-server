const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "bemo",
    host: "first-project-bemo.cuj6krjod3k4.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
    port: '13306'
  },
  test: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "bemo_test",
    host: "first-project-bemo.cuj6krjod3k4.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
    port: '13306'
  },
  production: {
    username: "admin",
    password: process.env.DATABASE_PASSWORD,
    database: "bemo_production",
    host: "first-project-bemo.cuj6krjod3k4.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
    port: '13306'
  }
}
