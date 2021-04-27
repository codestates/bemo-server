const express = require("express");
const router = express.Router();
const path = require('path');
const {upload} = require("./multer");
const { Photo, User } = require("../models");
const { 
        photo,
        like
     } = require('../controllers/photos');
const users = require("../controllers/users");


// * POST upload
router.post("/photo/upload", upload.single("img"), 
  async (req,res) => {
// console.log(req.file);
  const photoUrl = await req.file.filename
//   console.log(url);
  res.json({photoUrl: photoUrl, message: '사진이 등록되었습니다.'});
});


// * POST 업로드
router.post("/photo", photo.post);

// * GET 전체
router.get("/", photo.get);

// * GET 전체 아이디별
router.get("/photo/:id", async (req,res) => {
  const photo = await Photo.findOne({
    where: {id : req.params.id},
  })
  // https://localhost:8080/photo/:id
  //res.render('/photo/:id', photo)
  res.json(photo);
});

// * PUT 수정
router.put("/photo/:id", photo.put);

// * delete 삭제
router.delete("/photo/:id", photo.delete);

module.exports = router;
