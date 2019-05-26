/**
 * ===========================
 * Title: api-gateway-app
 * Name: user.js
 * Author: Donald Cousar
 * Date: 5/26/2019
 * ===========================
 */

// Create and export mongoose user schema and db functions
const mongoose = require("mongoose"),
  userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "username is required"] },
    password: { type: String, required: [true, "password is required"] },
    email: { type: String, required: [true, "email is required"] }
  });

module.exports = mongoose.model("User", userSchema);

module.exports.add = async user => {
  return await user.save();
};

module.exports.getById = (id, callback) => {
  const query = { _id: id };
  User.findById(query, callback);
};
