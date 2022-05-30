require("dotenv").config();

const knex = {
  client: "mysql2",
  connection: process.env.CONFIG_DATABASE,
};

module.exports = knex;
