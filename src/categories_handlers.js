const option = require("./knex");
const knex = require("knex")(option);

const getCategories = async (req, h) => {
  if (req.query.api_key !== process.env.API_KEY) {
    return h
      .response({
        success: false,
        code: 401,
        message: "you unauthorized",
        detail: "access to this resource is denied, you dont have permission",
      })
      .code(401);
  }

  return await knex("categories")
    .then((result) => {
      return h
        .response({
          success: true,
          code: 200,
          message: "your request successfully",
          data: result,
        })
        .code(200);
    })
    .catch((error) => {
      return h
        .response({
          success: false,
          code: 404,
          message: "your request failed!",
          detail: error,
        })
        .code(404);
    });
};

const getCategoryById = async (req, h) => {
  if (req.query.api_key !== process.env.API_KEY) {
    return h
      .response({
        success: false,
        code: 401,
        message: "you unauthorized",
        detail: "access to this resource is denied, you dont have permission",
      })
      .code(401);
  }

  return await knex("categories")
    .where("id", req.params.id)
    .then((result) => {
      return h
        .response({
          success: true,
          code: 200,
          message: "your request successfully",
          data: result[0],
        })
        .code(200);
    })
    .catch((error) => {
      return h
        .response({
          success: false,
          code: 404,
          message: "your request failed!",
          detail: error,
        })
        .code(404);
    });
};

module.exports = { getCategories, getCategoryById };
