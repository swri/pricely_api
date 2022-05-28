const {
  getProducts,
  getCategory,
  getPrice,
  unknownRoutes,
  requestPayload,
} = require("./handlers");

module.exports = [
  // PRODUCTS
  {
    method: "GET",
    path: "/",
    handler: getProducts,
  },

  // CATEGORY
  {
    method: "GET",
    path: "/category",
    handler: getCategory,
  },

  // PRICE
  {
    method: "GET",
    path: "/price",
    handler: getPrice,
  },

  // {
  //   method: "POST",
  //   path: "/",
  //   handler: requestPayload,
  // },

  {
    method: "*",
    path: "/{any*}",
    handler: unknownRoutes,
  },
];
