"use strict";

const hapi = require("@hapi/hapi");
const routes = require("./routes");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const init = async () => {
  const server = hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    // tls: {
    //   key: fs.readFileSync(path.resolve("src/utils/private.key")),
    //   cert: fs.readFileSync(path.resolve("src/utils/certificate.crt")),
    // },
    routes: {
      cors: {
        origin: ["*"],
      },
      files: {
        relativeTo: path.join(__dirname, "utils"),
      },
    },
  });

  await server.register(require("@hapi/inert"));

  server.route(routes);

  await server.start();
};

init();
