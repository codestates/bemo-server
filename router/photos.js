const express = require("express");
const router = express.Router();

const { 
        photo,
        like
     } = require('../controllers/photos');



// * POST /users/signup
router.post("/photo", photo);


// * POST /users/signup
// router.post("/like", like);

module.exports = router;
