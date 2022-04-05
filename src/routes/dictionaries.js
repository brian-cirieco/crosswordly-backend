const express = require("express");
const router = express.Router();
const { Dictionary } = require("../models");

router.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) throw new Error();
    const { trieJSON } = await Dictionary.findOne({ where: { id: req.params.id } });
    return res.json(trieJSON);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;