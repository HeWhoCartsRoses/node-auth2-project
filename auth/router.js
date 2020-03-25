const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("../router/model");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
router.post("/register", (req, res) => {
  const userInfo = req.body;
  const ROUNDS = process.env.HASHING_ROUNDS || 8;
  const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
  userInfo.password = hash;
  Users.add(userInfo)
    .then(user => {
      res.json(user);
    })
    .catch(err => console.log(err));
});
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({
    username
  })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials"
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
