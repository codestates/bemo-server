const express = require("express");
const router = express.Router();

const { 
        hashtag
     } = require('../controllers/hashtags');


// * GET /users/refreshToken
router.get('/hashtag', hashtag);



module.exports = router;










