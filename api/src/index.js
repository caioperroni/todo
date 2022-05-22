// libs require
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// config require and sets
const config = require("./config/config");

const port = config.apiPort;
const options = config.swaggerOptions;

// app and swagger init
const app = express();
const expressSwagger = require("express-swagger-generator")(app);
app.use(bodyParser.json());
app.use(cors());

// controllers require
const user = require("./controller/user.controller");
const project = require("./controller/proj.controller");
const task = require("./controller/task.controller");

// controllers setup
app.post("/api/user", user.add);
app.post("/api/user/login", user.login);

app.post("/api/project", project.add);
app.get("/api/project/update", project.update);
app.get("/api/project/remove", project.remove);
app.get("/api/project", project.getByUser);

app.post("/api/task", task.add);
app.get("/api/task/update", task.update);
app.get("/api/task/remove", task.remove);
app.get("/api/task", task.getByProject);

// swagger setup
app.get("/swagger", config.swaggerRedirect);
app.get("/", config.swaggerRedirect);
app.get("/api-docs.json", config.swaggerDocs);
expressSwagger(options);

// app start
app.listen(port, config.listening);
