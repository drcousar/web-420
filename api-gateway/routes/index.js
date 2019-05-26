/**
 * ===========================
 * Title: api-gateway-app
 * Name: index.js
 * Author: Donald Cousar
 * Date: 5/26/2019
 * ===========================
 */

const router = require("express").Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
