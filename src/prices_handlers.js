const option = require("./knex");
const knex = require("knex")(option);

const date = new Date();

exports.getPrices = async (req, h) => {
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

  if (
    year !== undefined &&
    year !== "true" &&
    month !== undefined &&
    month !== "true"
  ) {
    return await knex("prices")
      .where("id_product", req.params.id)
      .andWhere("month", parseInt(month))
      .andWhere("year", parseInt(year))
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
        }
        return h
          .response({
            success: true,
            code: 200,
            message: "your request successfully.",
            data: result[0],
          })
          .code(200);
      })
      .catch((error) => {
        return h
          .response({
            success: false,
            code: 404,
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  } else if (year === undefined && month === "true") {
    return await knex("prices")
      .select(knex.raw("row_number() over() as id"), "price", "month", "year")
      .where("id_product", req.params.id)
      .andWhere(function () {
        this.where("year", date.getUTCFullYear() - 1).orWhere(
          "year",
          date.getUTCFullYear() - 2
        );
      })
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
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  } else if (year === "true" && month === undefined) {
    return await knex("prices")
      .select(
        knex.raw("row_number() over() as id"),
        "year",
        knex.raw("cast(avg(price) as decimal) as price")
      )
      .where("id_product", req.params.id)
      .groupBy("year")
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
              message: "your request successfully.",
              data: result,
            })
            .code(200);
        }
      })
      .catch((error) => {
        return h
          .response({
            success: false,
            code: 404,
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  } else {
    return await knex("prices")
      .where("id_product", req.params.id)
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
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  }
};
