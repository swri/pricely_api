const {
  getProducts,
  getProductById,
  getDetailProductById,
  getCategory,
  getCategoryById,
  getDetailCategoryById,
  getPrice,
  getPriceByProductId,
  getYearPriceByProductId,
  unknownRoutes,
  requestPayload,
} = require("./handlers");

module.exports = [
  // HOME SWEET HOME
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      const data = "HALO SELAMAT DATANG";
      const response = h.response({
        success: true,
        message: "SEMANGAT TeamCloud",
        data: data,
      });
      response.code(200);
      return response;
    },
  },

  // PRODUCTS
  {
    method: "GET",
    path: "/products",
    handler: getProducts,
  },

  // PRODUCT By ID
  {
    method: "GET",
    path: "/product/{id}",
    handler: getProductById,
  },

  // PRODUCT DETAIL By ID
  {
    method: "GET",
    path: "/product/{id}/{col}",
    handler: getDetailProductById,
  },

  // CATEGORY
  {
    method: "GET",
    path: "/category",
    handler: getCategory,
  },

  // CATEGORY By ID
  {
    method: "GET",
    path: "/category/{id}",
    handler: getCategoryById,
  },

  // CATEGORY Name, Desc, img_url By ID
  {
    method: "GET",
    path: "/category/{id}/{col}",
    handler: getDetailCategoryById,
  },

  // PRICE
  {
    method: "GET",
    path: "/price",
    handler: getPrice,
  },

  // PRICE BY PRODUCT ID
  {
    method: "GET",
    path: "/price/{id}",
    handler: getPriceByProductId,
  },

  // PRICE BY YEAR AND PRODUCT ID
  {
    method: "GET",
    path: "/price/{id}/{col}",
    handler: getYearPriceByProductId,
  },

  // PAYLOAD
  {
    method: "POST",
    path: "/",
    handler: requestPayload,
  },

  {
    method: "*",
    path: "/{any*}",
    handler: unknownRoutes,
  },
];
