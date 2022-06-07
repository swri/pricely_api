const option = require("./knex");
const knex = require("knex")(option);

const date = new Date();

exports.getProductBySearch = async (req, h) => {
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

  if (req.query.query === undefined) {
    return h
      .response({
        success: false,
        code: 404,
        message: "your request failed",
        detail: "please fill query request cause its not defined",
      })
      .code(404);
  } else {
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select(
        "products.id",
        "products.name",
        "prices.price",
        "products.weight",
        "products.unit",
        "products.image_url"
      )
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", date.getUTCMonth() + 1)
      .whereILike("name", `${req.query.query}%`)
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
            message: "your request failed",
            detail: error.message,
          })
          .code(404);
      });
  }
};

exports.getSuggestions = async (req, h) => {
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

  return await knex("products")
    .select("id", "name")
    .orderByRaw("RAND()")
    .limit(5)
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
          message: "your request failed",
          detail: error.message,
        })
        .code(404);
    });
};
