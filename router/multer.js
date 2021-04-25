const express = require('express');
const path = require('path');
const multer  = require("multer");


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
