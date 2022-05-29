const { getProducts, getProductById } = require("./products_handlers");
const { getCategories, getCategoryById } = require("./categories_handlers");
const getPrices = require("./prices_handlers");
const { unknownRoutes } = require("./handlers");

module.exports = [
  {
    method: "GET",
    path: "/api/products/{any*}",
    handler: getProducts,
  },

  {
    method: "GET",
    path: "/api/product/{id}/{any*}",
    handler: getProductById,
  },

  {
    method: "GET",
    path: "/api/categories/{any*}",
    handler: getCategories,
  },

  {
    method: "GET",
    path: "/api/category/{id}/{any*}",
    handler: getCategoryById,
  },

  {
    method: "GET",
    path: "/api/price/{id}/{any*}",
    handler: getPrices,
  },

  {
    method: "*",
    path: "/api/{any*}",
    handler: unknownRoutes,
  },
];
