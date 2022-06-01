const option = require("./knex");
const knex = require("knex")(option);

exports.getProductBySearch = getProductBySearch = async (req, h) => {
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
      .select("id", "name")
      .whereILike("name", `%${req.query.query}%`)
      .andWhereILike("description", `%${req.query.query}%`)
      .limit(5)
      .then((result) => {
        if (result.length === 0) {
          return h
            .response({
              success: false,
              code: 404,
              message: "your request failed",
              detail: `nothing value like ${req.query.query}`,
            })
            .code(404);
        } else if (result.length === 1) {
          return h
            .response({
              success: true,
              code: 200,
              message: "your request successfully",
              data: result[0],
            })
            .code(200);
        }
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

exports.getSuggestions = getSuggestion = async (req, h) => {
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
