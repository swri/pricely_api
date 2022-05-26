const option = require("./knex");
const knex = require("knex")(option);

const getProducts = async (req, h) => {
  try {
    const data = await knex("price_products").select().orderBy('tahun');
    const response = h.response({
      success: true,
      message: "Your request succesfully.",
      data: data,
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      success: false,
      message: error.message,
      error: error.code,
    });
    response.code(400);
    return response;
  }
};

const requestPayload = async (req, h) => {
  const payload = req.payload;
  return `data: ${payload}!`;
};

// ============= Error Handler ===============

const unknownRoutes = async (_, h) => {
  return h
    .response({
      success: false,
      messages: "your request cant proccess!",
      data: null,
    })
    .code(500);
};

module.exports = { getProducts, unknownRoutes, requestPayload };
