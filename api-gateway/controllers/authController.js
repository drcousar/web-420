/**
 * ===========================
 * Title: api-gateway-app
 * Name: authController.js
 * Author: Donald Cousar
 * Date: 5/26/2019
 * ===========================
 */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

// auth register
exports.user_register = (req, res) => {
  try {
    // hash/salt password
    const hashed = bcrypt.hashSync(req.body.password, 8);
    // create new user model
    const newUser = new User({
      username: req.body.username,
      password: hashed,
      email: req.body.email
    });
    // Call the model add function to save user
    User.add(newUser)
      // Promise resolves, send good response with a new token
      .then(user => {
        const token = jwt.sign({ id: user._id }, config.web.secret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
      })
      // Promise rejected, send server error
      .catch(err => {
        res.status(500).send("Error saving user");
      });
  } catch (e) {
    res.status(500).send("Error, bad registration payload");
  }
};

// auth token get
exports.user_token = (req, res) => {
  try {
    // Check for token in header
    const token = req.headers["x-access-token"];
    if (!token) {
      res
        .status(401)
        .send({ auth: false, message: "Error, no token provided" });
    }
    // We found token, verify it
    jwt.verify(token, config.web.secret, (err, decoded) => {
      if (err) {
        res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token" });
      }
      // Find user in db by decoded id
      User.findById(decoded.id)
        .then(user => {
          if (!user) {
            res.status(404).send("User not found");
          }
          res.status(200).send(user);
        })
        .catch(err => {
          res.status(500).send("Error finding that user");
        });
    });
    // problem with headers or something else
  } catch (e) {
    res.status(500).send("Error, something went wrong");
  }
};

//Handle user login requests
exports.user_login = function(req, res) {

  User.getOne(req.body.email, function(err, user) {
    
    if(err) return res.status(500).send('Error on server.');
    if(!user) return res.status(404).send('No user found');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if(!passwordIsValid) return res.status(401).send({ auth: false, token:null});

    var token = jwt.sign({ id: user.id}, config.web.secret, {
      expiresIn: 86400 //24 hrs
    });
      res.status(200).send({auth: true, token: token });
  })
};

//Handle log out
exports.user_logout = function(req, res) {
  res.status(200).send({auth: false, token: null});
};


