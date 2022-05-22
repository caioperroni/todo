const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const rawdataUser = fs.existsSync("data/user.json")
  ? fs.readFileSync("data/user.json")
  : "[]";
const users = JSON.parse(rawdataUser);

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

/**
 * This function comment is parsed by doctrine
 * @route POST /api/user
 * @group User - Operations about user
 * @param {User.model} user.body.required - the new user
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {User.model} 200 - The new User
 * @returns {Error}  500 - Username already taken.
 */
const add = (req, res) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    const user = req.body;
    const pass = bcrypt.hashSync(user.pass, salt);
    user.pass = pass;
    if (!exists(user.user)) {
      users.push(user);
      const json = JSON.stringify(users);
      res.json(req.body);
      if (!fs.existsSync("data")) fs.mkdirSync("data");
      fs.writeFileSync("data/user.json", json);
    } else {
      res.status(500).send("Username already taken.");
    }
  }
};

/**
 * This function comment is parsed by doctrine
 * @route POST /api/user/login
 * @group User - Operations about user
 * @param {Login.model} user.body.required - the login data
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Login.model} 200 - The username
 * @returns {Error}  500 - Wrong password. || Username is wrong. Does not exist.
 */
const login = (req, res) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    const data = req.body;
    const idx = users.findIndex((item) => {
      return item.user === data.user;
    });
    if (idx >= 0) {
      const hash = users[idx].pass;
      const compare = bcrypt.compareSync(data.pass, hash);
      if (compare) {
        const data = {
          token: genToken(users[idx]),
          name: users[idx].name,
          user: users[idx].user,
        };
        res.json(data);
      } else {
        res.status(500).send("Wrong password.");
      }
    } else {
      res.status(500).send("Username is wrong. Does not exist.");
    }
  }
};

const exists = (check) => {
  const idx = users.findIndex((item) => {
    return item.user === check;
  });
  return idx >= 0;
};

const genToken = (user) => {
  const data = JSON.stringify(user);
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data,
    },
    process.env.SECRET_KEY
  );
  return token;
};

module.exports = {
  add,
  login,
};
