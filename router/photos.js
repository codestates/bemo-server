const express = require("express");
const router = express.Router();
const path = require('path');
const {upload} = require("./multer");

const { 
        photo,
        like
     } = require('../controllers/photos');

// * POST upload
router.post("/upload", upload.single("img"),
  async (req,res) => {
// console.log(req.file);
  const photoUrl = await req.file.filename
//   console.log(url);
  res.json({photoUrl: photoUrl});
});

// * POST 
router.post("/", photo.post);

// * POST
// router.post("/like", like);

module.exports = router;
