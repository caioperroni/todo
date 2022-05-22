const express = require("express");
const fs = require("fs");

const config = require("./config");
const options = config.swaggerOptions;

const app = express();

const expressSwagger = require("express-swagger-generator")(app);

const json = expressSwagger(options);

// logic for npm run build -- docker
if (process.argv[2] && process.argv[2] == "docker") {
  json.host = "api.localhost";
}

fs.writeFileSync("dist/api-docs.json", JSON.stringify(json));
