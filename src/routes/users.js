const { Router } = require("express");
const router = Router();
const { User } = require("../models");

/* GET users listing. */
router.get('', async (req, res, next) => {
  const { highScores, limit } = req.body;
  try {
    const users = highScores
      ? await User.findAll({
        limit: limit,
        order: [[ "highScore", "DESC" ]]
      })
      : await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
});

/* GET user listing by id. */
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ msg: "user does not exist" });
    return res.status(200).json(user);
  } catch(err) {
    return next(err);
  }
});

/* POST users listing. */
router.post("", async (req, res, next) => {
  const { username, displayName, password } = req.body;
  try {
    const user = await User.create({ username, displayName, password });
    return res.status(201).json(user);
  } catch(err) {
    return next(err);
  }
});

/* PATCH user high score */
router.patch("/:id", async (req, res, next) => {
  const { highScore } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    user.highScore = highScore;
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
});

/* DELETE user listing. */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(404).json({ msg: "User could not be found" });
    await user.destroy();
    return res.status(200).json({ msg: "User has been deleted" });
  } catch(err) {
    return next(err);
  }
});

module.exports = router;
