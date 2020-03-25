const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const usersRouter = require("./router/router");
const authRouter = require("./auth/router");
const restricted = require("./auth/middle");
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
  res.json({
    api: "up"
  });
});
module.exports = server;