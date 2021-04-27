const express = require("express");
const router = express.Router();

const { 
        comment,
     } = require('../controllers/comments');

// * POST /users/signup
router.post("/photo/:id/comment", comment.post);
// * POST /users/login
router.put("/photo/:id/comment/:id", comment.put);
// // * delete /users/withdrawal
router.delete('/photo/:id/comment/:id', comment.delete);



// * get /users/mypage
// router.get('/mypage', mypage);


module.exports = router;










