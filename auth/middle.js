module.exports = (req, res, next) => {
  if (req) {
    next();
  } else {
    res.status(401).json({
      you: "no bueno, señor!"
    });
  }
};
