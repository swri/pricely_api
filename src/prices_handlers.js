const option = require("./knex");
const knex = require("knex")(option);

const date = new Date();

const getPrices = async (req, h) => {
  const { id } = req.params;
  const { year, month } = req.query;

  if (year !== undefined && month !== undefined) {
    return await knex("prices")
      .where("id_product", id)
      .andWhere("month", parseInt(month))
      .andWhere("year", parseInt(year))
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
        }
        return h
          .response({
            success: true,
            message: "your request successfully.",
            data: result[0],
          })
          .code(200);
      })
      .catch((error) => {
        return h
          .response({
            success: false,
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  } else if (year === undefined && month !== undefined) {
    return await knex("prices")
      .where("id_product", id)
      .andWhere("month", parseInt(month))
      .andWhere("year", date.getUTCFullYear() - 1)
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
              message: "your request successfully.",
              data: result[0],
            })
            .code(200);
        }
      })
      .catch((error) => {
        return h
          .response({
            success: false,
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  } else if (year !== undefined && month === undefined) {
    return await knex("prices")
      .where("id_product", id)
      .andWhere("month", date.getUTCMonth() + 1)
      .andWhere("year", parseInt(year))
      .then((result) => {
        if (year < 2013 || year > 2021) {
          return h
            .response({
              success: false,
              message: "your request failed.",
              detail: "your value entered exceeds the limit.",
            })
            .code(200);
        } else {
        }
        return h
          .response({
            success: true,
            message: "your request successfully.",
            data: result[0],
          })
          .code(200);
      })
      .catch((error) => {
        return h
          .response({
            success: false,
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  } else {
    return await knex("prices")
      .where("id_product", id)
      .then((result) => {
        return h
          .response({
            success: true,
            message: "your request successfully.",
            data: result,
          })
          .code(200);
      })
      .catch((error) => {
        return h
          .response({
            success: false,
            message: "your request failed.",
            detail: error.message,
          })
          .code(404);
      });
  }
};

module.exports = getPrices;