const option = require("./knex");
const knex = require("knex")(option);

const getCategories = async (_, h) => {
  return await knex("categories")
    .then((result) => {
      return h
        .response({
          success: true,
          message: "your request successfully",
          data: result,
        })
        .code(200);
    })
    .catch((error) => {
      return h
        .response({
          success: false,
          message: "your request failed!",
          detail: error,
        })
        .code(404);
    });
};

const getCategoryById = async (req, h) => {
  const { id } = req.params;

  return await knex("categories")
    .where("id", id)
    .then((result) => {
      return h
        .response({
          success: true,
          message: "your request successfully",
          data: result[0],
        })
        .code(200);
    })
    .catch((error) => {
      return h
        .response({
          success: false,
          message: "your request failed!",
          detail: error,
        })
        .code(404);
    });
};

module.exports = { getCategories, getCategoryById };
