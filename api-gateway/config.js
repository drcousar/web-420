/**
 * ===========================
 * Title: api-gateway-app
 * Name: config.js
 * Author: Donald Cousar
 * Date: 5/26/2019
 * ===========================
 */

const config = {};
config.web = {};
config.web.port = process.env.PORT || "3000";
config.web.secret = "secret";

module.exports = config;
