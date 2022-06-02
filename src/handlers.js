// ============= Error Handler ===============

exports.getHomepage = async (_, h) => {
  return h.file("index.html");
};

exports.unknownPage = async (_, h) => {
  return h.file("error.html");
};

exports.unknownRoutes = async (_, h) => {
  return h
    .response({
      success: false,
      code: 404,
      messages: "your request failed.",
      detail: "the api you're trying to reach cant be found.",
    })
    .code(404);
};
