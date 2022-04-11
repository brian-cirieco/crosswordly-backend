const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const createToken = user => {
  return jwt.sign({ ...user, password: undefined }, SECRET_KEY);
}

module.exports = createToken;