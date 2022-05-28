const option = require("./knex");
const knex = require("knex")(option);

// GET PRODUCT
const getProducts = async (req, h) => {
  try {
    const data = await knex("comodity").select().orderBy("id");
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

// GET PRODUCT BY ID
const getProductById = async (req, h) => {
  try {
    const { id } = req.params;
    const data = await knex("comodity").where({ id: id });
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

// GET PRODUCT DETAIL DESC BY ID
const getDetailProductById = async (req, h) => {
  try {
    const { id } = req.params;
    const { col } = req.params;
    const data = await knex("comodity").where({ id: id }).select(col);
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

// GET CATEGORY
const getCategory = async (req, h) => {
  try {
    const data = await knex("category").select().orderBy("id");
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

// GET CATEGORY ID
const getCategoryById = async (req, h) => {
  try {
    const { id } = req.params;
    const data = await knex("category").where({ id: id });
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

// GET CATEGORY NAME,DESC,IMGURL BY ID
const getDetailCategoryById = async (req, h) => {
  try {
    const { id } = req.params;
    const { col } = req.params;
    const data = await knex("category").where({ id: id }).select(col);
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

// GET PRICE
const getPrice = async (req, h) => {
  try {
    const data = await knex("price").select().orderBy("id");
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

// GET PRICE BY PRODUCT ID
const getPriceByProductId = async (req, h) => {
  try {
    const { id } = req.params;
    const data = await knex("price").where({ id_comodity: id });
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

module.exports = {
  getProducts,
  getProductById,
  getDetailProductById,
  getCategory,
  getCategoryById,
  getDetailCategoryById,
  getPrice,
  getPriceByProductId,
  unknownRoutes,
  requestPayload,
};
