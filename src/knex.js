require("dotenv").config();

const knex = {
  client: "mysql2",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset: process.env.CHARSET,
  },
};

module.exports = knex;
