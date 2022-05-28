const { getProducts, unknownRoutes, getPrices } = require("./handlers");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: getProducts,
  },

  {
    method: 'GET',
    path: '/prices/{id}',
    handler: getPrices,
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
