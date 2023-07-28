require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: "ikzqewwn",
    password: "F5u_H_A5pstE8e8uqkp3GhJwv0s2w0Ga",
    database: "ikzqewwn",
    host: "rosie.db.elephantsql.com",
    dialect: "postgres",
  },
};
