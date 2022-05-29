const { getPrices } = require("./prices_handlers");
const { unknownRoutes, getHomepage, unknownPage } = require("./handlers");
const { getProducts, getProductById } = require("./products_handlers");
const { getCategories, getCategoryById } = require("./categories_handlers");

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
    path: "/",
    handler: getHomepage,
  },

  {
    method: "*",
    path: "/{any*}",
    handler: unknownPage,
  },

  {
    method: "*",
    path: "/api/{any*}",
    handler: unknownRoutes,
  },
];
