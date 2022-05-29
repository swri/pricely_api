const option = require("./knex");
const knex = require("knex")(option);

const date = new Date();

const getProducts = async (req, h) => {
  const { category } = req.query;

  if (category !== undefined) {
    return await knex("products")
      .where("id_category", category)
      .then((result) => {
        const response = h.response({
          success: true,
          message: "your request successfully.",
          data: result,
        });
        response.code(200);
        return response;
      })
      .catch((error) => {
        const response = h.response({
          success: false,
          message: "your request failed",
          detail: error.message,
        });
        response.code(404);
        return response;
      });
  }

  return await knex("products")
    .then((result) => {
      const response = h.response({
        success: true,
        message: "your request successfully.",
        data: result,
      });
      response.code(200);
      return response;
    })
    .catch((error) => {
      const response = h.response({
        success: false,
        message: "your request failed",
        detail: error.message,
      });
      response.code(404);
      return response;
    });
};

const getProductById = async (req, h) => {
  const { id } = req.params;
  const { year, month } = req.query;

  if (year !== undefined && month !== undefined) {
    return await knex
      .from("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", id)
      .andWhere("year", parseInt(year))
      .andWhere("month", parseInt(month))
      .then((result) => {
        if (month < 1 || month > 12 || year < 2013 || year > 2021) {
          return h
            .response({
              success: false,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(404);
        } else {
          return h
            .response({
              success: true,
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
            message: "your request failed",
            detail: error.message,
          })
          .code(404);
      });
  } else if (year !== undefined && month === undefined) {
    return await knex
      .from("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", id)
      .andWhere("year", parseInt(year))
      .andWhere("month", date.getUTCMonth() + 1)
      .then((result) => {
        if (year < 2013 || year > 2021) {
          return h
            .response({
              success: false,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(404);
        } else {
          return h
            .response({
              success: true,
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
            message: "your request failed",
            detail: error.message,
          })
          .code(404);
      });
  } else if (month !== undefined && year === undefined) {
    return await knex
      .from("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", parseInt(month))
      .then((result) => {
        if (month < 1 || month > 12) {
          return h
            .response({
              success: false,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(404);
        } else {
          return h
            .response({
              success: true,
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
            message: "your request failed",
            detail: error.message,
          })
          .code(404);
      });
  } else {
    return await knex
      .from("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", date.getUTCMonth() + 1)
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
            message: "your request failed",
            detail: error.message,
          })
          .code(404);
      });
  }
};

module.exports = { getProducts, getProductById };
