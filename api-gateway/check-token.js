/**
 * ===========================
 * Title: check token
 * Name: check-token.js
 * Author: Donald Cousar
 * Date: 6/23/2019
 * ===========================
 */

const jwt = require("jsonwebtoken");
const config = require("./config");

/**
 * Check HTTP header for valid JSON token
 */

var checkToken = function(req,res,next) {
    var token = req.headers['x-access-token'];

    if(!token)
        return res.status(403).send({auth: false, message: 'No token provided'});

    jwt.verify(token, config.web.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
    
        console.log(decoded.id);
        req.userId = decoded.id;
        next();
    });
}

module.exports = checkToken;