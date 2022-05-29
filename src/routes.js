const {
  getProducts,
  getProductById,
  getCategory,
  getCategoryById,
  getPriceByProductId,
  getPrice,
  unknownRoutes,
} = require("./handlers");

module.exports = [
  // PRODUCTS
  {
    method: "GET",
    path: "/",
    handler: getProducts,
  },

  // PRODUCT By ID
  {
    method: "GET",
    path: "/product/{id}",
    handler: getProductById,
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

  // PAYLOAD
  {
    method: "GET",
    path: "/prices/{id}",
    handler: getPrice,
  },

  {
    method: "*",
    path: "/{any*}",
    handler: unknownRoutes,
  },
];
