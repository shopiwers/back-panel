var express = require('express');
var testController = require('../controllers/testController');

var api = express.Router();

api.get('/prueba_test', testController.prueba_test);


module.exports = api;