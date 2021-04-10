var express = require('express');
var router = express.Router();

const { usersController } = require('../controller');

router.post('/signup', usersController.singup.post);


module.exports = router;
