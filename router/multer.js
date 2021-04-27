const express = require('express');
const path = require('path');
const multer  = require("multer");
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

// const s3 = new aws.S3({ 
//   accessKeyId: process.env.KEYID,
//   secretAccessKey: process.env.KEY, 
//   region: process.env.REGION, 
// });

// const upload = multerS3({ 
//   s3: s3,
//   bucket: '',
//   contentType: multerS3.AUTO_CONTENT_TYPE, 
//   acl: 'public-read',
//   metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname }) 
//   },
//   key: function (req, file, cb) { 
//       cb(null, `upload/${Date.now()}_${file.originalname}`)
//   },
// })

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads/');
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits : {fileSize: 5 * 1024 * 1024},
});

exports.upload = upload;
