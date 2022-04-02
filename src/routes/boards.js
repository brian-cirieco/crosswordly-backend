const express = require("express");
const router = express.Router();
const Board = require("../Board");

router.get("", async (req, res, next) => {
  try {
    if (!req.query.letters) throw new Error();
    const board = new Board(req.query.letters);
    await board.genBoard();
    const words = board.activeWords;
    const crossword = board.rows;
    return res.status(200).json({ words, crossword });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;