const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

/**
 * creates JSON web token for user data
 * @param {{username: string, displayName: string, password: string, highScore: number}} user - user data
 * @yields {string} JSON Web Token
 */
const createToken = user => jwt.sign({ ...user, password: undefined }, SECRET_KEY);

module.exports = createToken;