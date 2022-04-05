const express = require("express");
const router = express.Router();
const { Dictionary } = require("../models");

router.get("", async (req, res, next) => {
  try {
    if (!req.query.lang) throw new Error();
    const { trieJSON } = await Dictionary.findOne({ where: { language: req.query.lang } });
    return res.json(trieJSON);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;