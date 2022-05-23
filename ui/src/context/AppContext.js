const genOptions = (body) => {
  return {
    method: body ? "POST" : "GET",
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: body ? JSON.stringify(body) : undefined,
  };
};

module.exports = {
  genOptions,
};
