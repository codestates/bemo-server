const express = require("express");
const router = express.Router();

const { 
        signup,
        login,
        withdrawal,
        mypage,
        accessToken,
        refreshToken
     } = require('../controllers/users');

// * POST /users/signup
router.post("/signup", signup);
// * POST /users/login
router.post("/login", login);
// * delete /users/withdrawal
router.delete('/withdrawal', withdrawal);
// * GET /users/accessToken
router.get('/accessToken', accessToken);
// * GET /users/refreshToken
router.get('/refreshToken', refreshToken);


// * get /users/mypage
// router.get('/mypage', mypage);


module.exports = router;










