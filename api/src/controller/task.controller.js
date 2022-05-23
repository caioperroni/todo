const fs = require("fs");
const rawdataTask = fs.existsSync("data/task.json")
  ? fs.readFileSync("data/task.json")
  : "[]";
const tasks = JSON.parse(rawdataTask);

/**
 * This function comment is parsed by doctrine
 * @route POST /api/task
 * @group Task - Operations about task
 * @param {Task.model} task.body.required - the new task
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Task.model} 200 - The new Task
 * @returns {Error}  500 - Taskname already taken.
 */
const add = (req, res) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    const task = req.body;
    task.id = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
    task.createdOn = new Date().toUTCString();
    tasks.push(task);
    const json = JSON.stringify(tasks);
    res.json(req.body);
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    fs.writeFileSync("data/task.json", json);
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/task/update
 * @group Task - Operations about task
 * @param {number} id.query.required - Task id
 * @param {string} name.query.required - Task new name
 * @param {string} finishedOn.query - Task new name
 * @returns {Task} 200 - ok
 * @returns {Error} 500 - Task not found.
 */
const update = (req, res) => {
  const idx = tasks.findIndex((item) => {
    return item.id === Number(req.query.id);
  });
  if (idx >= 0) {
    tasks[idx].description = req.query.name;
    if (req.query.finishedOn) tasks[idx].finishedOn = new Date().toUTCString();
    const json = JSON.stringify(tasks);
    res.json("ok");
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    fs.writeFileSync("data/task.json", json);
  } else {
    res.status(500).send("Task not found.");
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/task/remove
 * @group Task - Operations about task
 * @param {number} id.query.required - Task id
 * @returns {Task} 200 - ok
 * @returns {Error} 500 - Task not found.
 */
const remove = (req, res) => {
  const idx = tasks.findIndex((item) => {
    return item.id === Number(req.query.id);
  });
  if (idx >= 0) {
    tasks.splice(idx, 1);
    const json = JSON.stringify(tasks);
    res.json("ok");
    if (!fs.existsSync("data")) fs.mkdirSync("data");
    fs.writeFileSync("data/task.json", json);
  } else {
    res.status(500).send("Task not found.");
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/task
 * @group Task - Operations about task
 * @param {string} id.query.required - Project id
 * @returns {Task} 200 - Tasks[]
 */
const getByProject = (req, res) => {
  const projTasks = tasks.filter((item) => {
    return item.project === Number(req.query.id);
  });
  if (projTasks.length >= 0) {
    res.json(projTasks);
  } else {
    res.json([]);
  }
};

/**
 * This function comment is parsed by doctrine
 * @route GET /api/task/removeByProject
 * @group Task - Operations about task
 * @param {string} id.query.required - Project id
 * @returns {Task} 200 - ok
 */
const removeByProject = (req, res) => {
  const projTasks = tasks.filter((item) => {
    return item.project !== Number(req.query.id);
  });
  const json = JSON.stringify(projTasks);
  res.json("ok");
  if (!fs.existsSync("data")) fs.mkdirSync("data");
  fs.writeFileSync("data/task.json", json);
};

module.exports = {
  add,
  update,
  remove,
  getByProject,
  removeByProject,
};
