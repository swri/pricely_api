const { getProducts, unknownRoutes, requestPayload } = require("./handlers");

module.exports = [
  {
    method: "GET",
    path: "/",
    handler: getProducts,
  },

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
