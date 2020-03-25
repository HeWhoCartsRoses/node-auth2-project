const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const usersRouter = require("./router/router");
const authRouter = require("./auth/router");
const restricted = require("./auth/middle");
const server = express();
const sessionConfig = {
  name: "styx",
  secret: "I got a secret, I've been hiding, under my skin",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true
};
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);
server.get("/", (req, res) => {
  res.json({
    api: "up"
  });
});
module.exports = server;
