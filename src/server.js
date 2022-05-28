"use strict";

const Hapi = require("@hapi/hapi");
require("dotenv").config();
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    // host: process.env.HOST,
    // port: process.env.PORT,
    host: "localhost",
    port: 5000,

    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);
  console.log(`Server berjalan pada ${server.info.uri}`);

  await server.start();
};

init();
