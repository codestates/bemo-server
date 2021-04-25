const jwt = require ('jsonwebtoken');
const { User, Photo } = require("../../models");

module.exports = {
    post : async(req,res) => { const authorization = req.headers.authorization;
   
    if(!authorization) {
        res.status(404).json({message:'로그인 후 이용바랍니다.'});
    }
    const {photoUrl, text, region } = req.body;
    const token = authorization.split(' ')[1]
    const data = jwt.verify(token, process.env.ACCESS_SECRET)

    const userInfo = await User.findOne({ where: { id: data.id }});
    console.log(userInfo)
    const photo = await Photo.create({
        userId : userInfo.dataValues.id,
        photo : photoUrl,
        text : text,
        region : region,
    });
        console.log(photo)
        res.json({message: '사진이 업로드 되었습니다.'});
        }
    }

    // const hashtags = req.body.content.match(/#[^\s#]*/g);
    // if (hashtags) {
    //     const result = await Promise.all(
    //       hashtags.map(tag => {
    //         return Hashtag.findOrCreate({
    //           where: { title: tag.slice(1).toLowerCase() },
    //         })
    //       }),
    //     );
    //     await post.addHashtags(result.map(r => r[0]));
    //   }
    //   res.redirect('/');
   
