/*
============================================
; Title:  API Gateway Part II
; Author: Don Cousar
; Date:   12 May 2019
; Description: API Catalog
;===========================================
*/ 
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
