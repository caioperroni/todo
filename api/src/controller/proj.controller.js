const fs = require("fs");
const rawdataProject = fs.existsSync("data/proj.json")
  ? fs.readFileSync("data/proj.json")
  : "[]";

const projects = JSON.parse(rawdataProject);

/**
 * This function comment is parsed by doctrine
 * @route POST /api/project
 * @group Project - Operations about project
 * @param {Project.model} project.body.required - the new project
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Project.model} 200 - The new Project
 * @returns {Error}  500 - Projectname already taken.
 */
const add = (req, res) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    const project = req.body;
    project.id =
      projects.length === 0 ? 1 : projects[projects.length - 1].id + 1;
    projects.push(project);
    const json = JSON.stringify(projects);
    res.json(req.body);
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    fs.writeFileSync("data/proj.json", json);
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/project/update
 * @group Project - Operations about project
 * @param {number} id.query.required - Project id
 * @param {string} name.query.required - Project new name
 * @returns {Project} 200 - ok
 * @returns {Error} 500 - Project not found.
 */
const update = (req, res) => {
  const idx = projects.findIndex((item) => {
    return item.id === Number(req.query.id);
  });
  if (idx >= 0) {
    projects[idx].name = req.query.name;
    const json = JSON.stringify(projects);
    res.json("ok");
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    fs.writeFileSync("data/proj.json", json);
  } else {
    res.status(500).send("Project not found.");
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/project/remove
 * @group Project - Operations about project
 * @param {number} id.query.required - Project id
 * @returns {Project} 200 - ok
 * @returns {Error} 500 - Project not found.
 */
const remove = (req, res) => {
  const idx = projects.findIndex((item) => {
    return item.id === Number(req.query.id);
  });
  if (idx >= 0) {
    projects.splice(idx, 1);
    const json = JSON.stringify(projects);
    res.json("ok");
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    fs.writeFileSync("data/proj.json", json);
  } else {
    res.status(500).send("Project not found.");
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/project
 * @group Project - Operations about project
 * @param {string} id.query.required - Project owner username
 * @returns {Project} 200 - Projects[]
 */
const getByUser = (req, res) => {
  const projs = projects.filter((item) => {
    return item.user === req.query.id;
  });
  if (projs.length >= 0) {
    res.json(projs);
  } else {
    res.json([]);
  }
};

module.exports = {
  add,
  update,
  remove,
  getByUser,
};
