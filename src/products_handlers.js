const option = require("./knex");
const knex = require("knex")(option);

const date = new Date();

exports.getProducts = getProducts = async (req, h) => {
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

exports.getProductById = getProductById = async (req, h) => {
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
    let previousPrice = await knex("prices")
      .select("price")
      .where("id_product", req.params.id)
      .andWhere("year", parseInt(year))
      .andWhere("month", parseInt(month) - 1)
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
    previousPrice = previousPrice[0]["price"];
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", req.params.id)
      .andWhere("year", parseInt(year))
      .andWhere("month", parseInt(month))
      .then((result) => {
        if (result[0]["price"] > previousPrice) {
          previousPrice = {
            isRising: true,
          };
        } else {
          previousPrice = {
            isRising: false,
          };
        }
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
              data: { ...result[0], ...previousPrice },
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
    let previousPrice = await knex("prices")
      .select("price")
      .where("id_product", req.params.id)
      .andWhere("year", parseInt(year))
      .andWhere("month", date.getUTCMonth())
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
    previousPrice = previousPrice[0]["price"];
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", req.params.id)
      .andWhere("year", parseInt(year))
      .andWhere("month", date.getUTCMonth() + 1)
      .then((result) => {
        if (result[0]["price"] > previousPrice) {
          previousPrice = {
            isRising: true,
          };
        } else {
          previousPrice = {
            isRising: false,
          };
        }
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
              data: { ...result[0], ...previousPrice },
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
    let previousPrice = await knex("prices")
      .select("price")
      .where("id_product", req.params.id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", parseInt(month) - 1)
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
    previousPrice = previousPrice[0]["price"];
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", req.params.id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", parseInt(month))
      .then((result) => {
        if (result[0]["price"] > previousPrice) {
          previousPrice = {
            isRising: true,
          };
        } else {
          previousPrice = {
            isRising: false,
          };
        }
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
              data: { ...result[0], ...previousPrice },
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
    let previousPrice = await knex("prices")
      .select("price")
      .where("id_product", req.params.id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", date.getUTCMonth())
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
    previousPrice = previousPrice[0]["price"];
    return await knex("products")
      .innerJoin("prices", "products.id", "prices.id_product")
      .select("products.*", "year", "month", "price")
      .where("products.id", req.params.id)
      .andWhere("year", date.getUTCFullYear() - 1)
      .andWhere("month", date.getUTCMonth() + 1)
      .then((result) => {
        if (result[0]["price"] > previousPrice) {
          previousPrice = {
            isRising: true,
          };
        } else {
          previousPrice = {
            isRising: false,
          };
        }
        return h
          .response({
            success: true,
            code: 200,
            message: "your request successfully",
            data: { ...result[0], ...previousPrice },
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
