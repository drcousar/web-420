/*
============================================
; Title:  API Gateway Part II
; Author: Don Cousar
; Date:   12 May 2019
; Description: Mongo DB
;===========================================
*/ 
/**
Fields username, password, and email
*/
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
 username: String,
 password: String,
 email: String
});
module.exports = mongoose.model('User', userSchema);
/**
Database
*/
//user.save is used to add a new user to the db
module.exports.add = (user, callback) => {
    user.save(callback);
};

module.exports.getById = (id, callback) => {
    var query = {_id: id};
    User.findById(query, callback);
};