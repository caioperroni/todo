apiPort = 3000;

listening = () => {
  console.clear();
  console.log(
    "\x1b[36m%s\x1b[0m",
    `[todo-api] listening on port::${apiPort}\n`
  );
  console.log(
    "\x1b[32m%s\x1b[0m",
    `Swagger available on http://localhost:${apiPort}/swagger`
  );
  console.log("\n---------------------------------------------------\nLOGS:");
};

swaggerRedirect = (req, res) => {
  res.redirect("/api-docs");
};

swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: "Code Challenge bolttech",
      title: "todo-api",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/",
    produces: ["application/json", "application/xml"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: process.cwd(),
  files: [`${process.cwd()}/src/*/*.js`, `${process.cwd()}/*.js`],
};

// logic for npm start (nodemon watch mode) and npm run dev -- docker
swaggerDocs = (req, res) => {
  if (process.argv[2] && process.argv[2] == "dev") {
    res.sendFile(`${process.cwd()}/dist/api-docs.json`);
  } else {
    res.sendFile(`${process.cwd()}/api-docs.json`);
  }
};

module.exports = {
  apiPort,
  listening,
  swaggerRedirect,
  swaggerOptions,
  swaggerDocs,
};
