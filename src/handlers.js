const option = require("./knex");
const knex = require("knex")(option);

// ============= Error Handler ===============

const unknownRoutes = async (_, h) => {
  return h
    .response({
      success: false,
      messages: "your request failed.",
      detail: "check your request value.",
    })
    .code(500);
};

module.exports = {
  unknownRoutes,
};
