const { User , Photo} = require("../../models");
const multer = require("multer");
const path = require('path');  

module.exports = async (req, res) => {
// creat 받아와야 할 것 : photo(multer) / text / region / hasgtag  / email
    // const user = await User.findOne({
    //     where : {email : req.body.email }
    // })
//    if(!user) {
//        res.status(400).json({message: '로그인을 해주세요.'});
//     }

    try {
        const photo = await Photo.create({
            userId: user.id,
            photo: req.body.photo,
            text : req.body.text,
            region: req.body.region,
        });
        
        // const hashtags = req.body.???
        res.josn({message: 'photo가 업로드 되었습니다.'});
        res.redirect('/');
    }catch (error) {
        console.log(error);
    }
    // const test = await User.findAll({
    //     where: { email: req.body.email },
    //     include: [
    //         {
    //             model: Photo,
    //             required: false,
    //             attributes: ['photo','text','region']
                
    //         }
    //     ]
    // })
    // res.status(200).json(test)
    // console.log(test);


    // const s3 = new AWS.S3({ 
    //     accessKeyId: process.env.KEYID, //노출주의
    //     secretAccessKey: process.env.KEY, //노출주의
    //     region: process.env.REGION, //노출주의
    // });
//    const storage = multer({
//        storage: multerS3({
//         s3 : s3,
//         bucket : 'fist-project-bemo',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname }) 
//         },
//         key: function (req, file, cb) { 
//             cb(null, `uploads/${Date.now()}_${file.originalname}`)
//         },
//        }),
//         limits: {fileSize: 5 * 1024 * 1024}
//    });


}