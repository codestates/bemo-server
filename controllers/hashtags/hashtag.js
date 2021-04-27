const { User, Photo, Hashtag, Photo_hashtag } = require("../../models");
const { Op } = require('sequelize');

module.exports = async (req,res) => {
    // 요청받은 해시값과 일치하는 해시를 찾고 그 해시가 해당되는 모든 사진을 보여준다. 
    const data = await Hashtag.findAll({
        where: {tagName : req.body.tagName},
        include: {
            model : Photo,
            attribute : ['*']
        }
    });
    // https://localhost:8080/hashtag
    //res.render('/hashtag', data)
    res.json({message: '태그와 일치하는 사진입니다', data});

}

