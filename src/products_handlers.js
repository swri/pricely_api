const option = require("./knex");
const knex = require("knex")(option);

const date = new Date();

exports.getProducts = async (req, h) => {
  const { category, recommendation } = req.query;

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

  if (category !== undefined && recommendation !== "true") {
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
      .where("prices.month", date.getUTCMonth() + 1)
      .andWhere("prices.year", date.getUTCFullYear() - 1)
      .andWhere("products.id_category", category)
      .limit(10)
      .then((result) => {
        return h
          .response({
            success: true,
            code: 200,
            message: "your request successfully.",
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
  } else if (category === undefined && recommendation == "true") {
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
      .where("prices.month", date.getUTCMonth() + 1)
      .andWhere("prices.year", date.getUTCFullYear() - 1)
      .orderBy("prices.price")
      .limit(10)
      .then((result) => {
        return h
          .response({
            success: true,
            code: 200,
            message: "your request successfully.",
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
  } else if (category !== undefined && recommendation === "true") {
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
      .where("prices.month", date.getUTCMonth() + 1)
      .andWhere("prices.year", date.getUTCFullYear() - 1)
      .andWhere("products.id_category", category)
      .orderBy("prices.price")
      .limit(10)
      .then((result) => {
        return h
          .response({
            success: true,
            code: 200,
            message: "your request successfully.",
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
      .where("prices.month", date.getUTCMonth() + 1)
      .andWhere("prices.year", date.getUTCFullYear() - 1)
      .limit(20)
      .then((result) => {
        return h
          .response({
            success: true,
            code: 200,
            message: "your request successfully.",
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

exports.getProductById = async (req, h) => {
  const { year, month } = req.query;

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

  if (year !== undefined && month !== undefined) {
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select(
        "products.*",
        "year",
        "month",
        "price",
        knex.raw(
          `IF (price > (SELECT price FROM prices WHERE id_product = ${
            req.params.id
          } AND year = ${parseInt(year)} AND month = ${
            parseInt(month) - 1
          }), 1, 0) as is_rising`
        )
      )
      .where("products.id", req.params.id)
      .andWhere("year", parseInt(year))
      .andWhere("month", parseInt(month))
      .then((result) => {
        if (month < 1 || month > 12 || year < 2013 || year > 2021) {
          return h
            .response({
              success: false,
              code: 400,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(400);
        } else {
          return h
            .response({
              success: true,
              code: 200,
              message: "your request successfully",
              data: result[0],
            })
            .code(200);
        }
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
  } else if (year !== undefined && month === undefined) {
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select(
        "products.*",
        "year",
        "month",
        "price",
        knex.raw(
          `IF (price > (SELECT price FROM prices WHERE id_product = ${
            req.params.id
          } AND year = ${parseInt(
            year
          )} AND month = ${date.getUTCMonth()}), 1, 0) as is_rising`
        )
      )
      .where("products.id", req.params.id)
      .andWhere("year", parseInt(year))
      .andWhere("month", date.getUTCMonth() + 1)
      .then((result) => {
        if (year < 2013 || year > 2021) {
          return h
            .response({
              success: false,
              code: 400,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(400);
        } else {
          return h
            .response({
              success: true,
              code: 200,
              message: "your request successfully",
              data: result[0],
            })
            .code(200);
        }
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
  } else if (month !== undefined && year === undefined) {
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select(
        "products.*",
        "year",
        "month",
        "price",
        knex.raw(
          `IF (price > (SELECT price FROM prices WHERE id_product = ${
            req.params.id
          } AND year = ${date.getUTCFullYear() - 1} AND month = ${
            parseInt(month) - 1
          }), 1, 0) as is_rising`
        )
      )
      .where("products.id", req.params.id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", parseInt(month))
      .then((result) => {
        if (month < 1 || month > 12) {
          return h
            .response({
              success: false,
              code: 400,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(400);
        } else {
          return h
            .response({
              success: true,
              code: 200,
              message: "your request successfully",
              data: result[0],
            })
            .code(200);
        }
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
  } else {
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select(
        "products.*",
        "year",
        "month",
        "price",
        knex.raw(
          `IF (price > (SELECT price FROM prices WHERE id_product = ${
            req.params.id
          } AND year = ${
            date.getUTCFullYear() - 1
          } AND month = ${date.getUTCMonth()}), 1, 0) as is_rising`
        )
      )
      .where("products.id", req.params.id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", date.getUTCMonth() + 1)
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
            message: "your request failed",
            detail: error.message,
          })
          .code(404);
      });
  }
};
