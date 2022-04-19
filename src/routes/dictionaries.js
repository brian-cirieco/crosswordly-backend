const express = require("express");
const router = express.Router();
const { Dictionary } = require("../models");

router.get("/:lang", async (req, res, next) => {
  try {
    if (!req.params.lang) throw new Error();
    const { trieJSON } = await Dictionary.findOne({ where: { language: req.params.lang } });
    return res.json(trieJSON);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;