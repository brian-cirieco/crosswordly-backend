const express = require("express");
const router = express.Router();
const Board = require("../Board");

router.get("", async (req, res, next) => {
  try {
    if (!req.query.letters) throw new Error();
    const board = new Board(req.query.letters);
    return await board.genBoard().then((result) => {
      return res.status(200).json(result);
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;