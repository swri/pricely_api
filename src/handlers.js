// ============= Error Handler ===============

const getHomepage = async (_, h) => {
  return h.file("index.html");
};

const unknownPage = async (_, h) => {
  return h.file("error.html");
};

const unknownRoutes = async (_, h) => {
  return h
    .response({
      success: false,
      code: 404,
      messages: "your request failed.",
      detail: "the api you're trying to reach cant be found.",
    })
    .code(404);
};

module.exports = {
  unknownRoutes,
  getHomepage,
  unknownPage,
};
