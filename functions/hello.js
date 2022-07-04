exports.handler = async (event) => {
  const subject = event.queryStringParamters.name || "World";

  return {
    statusCode: 200,
    body: `Hello ${subject}!`
  };
};
