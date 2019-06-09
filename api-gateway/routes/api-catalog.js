/**
 * ===========================
 * Title: api-gateway-app
 * Name: api-catalog.js
 * Author: Donald Cousar
 * Date: 5/26/2019
 * ===========================
 */

const router = require("express").Router();
const authController = require("../controllers/authController");

// Define routes

// POST for user registration
router.post("/auth/register", authController.user_register);

// GET for user token
router.get("/auth/token", authController.user_token);

// Allow user login requests
router.post("/auth/login", authController.user_login);

//Allow user logout requests
router.get("/auth/logout", authController.user_logout);

module.exports = router;
