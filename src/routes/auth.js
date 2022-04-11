const express = require("express");
const router = express.Router();
const { User } = require("../models");
const createToken = require("../helpers/tokens");
const bcrypt = require("bcrypt");

/** POST /auth/token
 * returns JWT token for authentication between requests
 */

router.post("/token", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ msg: "Invalid login credentials" });
    const token = createToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;