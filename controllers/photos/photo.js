const { text } = require('express');
const jwt = require ('jsonwebtoken');
const { User, Photo, Hashtag, Photo_hashtag } = require("../../models");


module.exports = {
    post : async(req,res) => { 
    // 헤더에서 authorization 추출한다. 토큰 확인을 하기 위해서
    const authorization = req.headers.authorization;
    // authorization없다면 로그인이 안된 상태이기에 로그인 후 이용바람 요청
    if(!authorization) {
        res.status(404).json({message:'로그인 후 이용바랍니다.'});
    };
    const {photoUrl, text, region } = req.body;
    // authorization에서 payload 추출
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    // 로그인 된 유저 정보 찾기
    const userInfo = await User.findOne({ where: { id: data.id }});
    // text 해쉬태그 찾는 변수  
    // 정규 표현식을 해석하면 #으로 시작해서 배열에 #,띄어쓰기를 제외하고 담는다.
    // ex [#해쉬,#소풍,#가을]
    const hashtags = text.match(/#[^\s#]*/g);

    // const originalText = string.split(' ').filter(function(val) {
    //   return hashtags.indexOf(val) == -1;
    //  });

    // photo 앨범 생성 userId는 userInfo에서 데이터 추출

        const photo = await Photo.create({
            userId : userInfo.dataValues.id,
            photo : photoUrl,
            text : text,
            region : region,
        });
        // 해쉬태그 값이 있다면 해쉬태그 테이블에 추가 
        if (hashtags) {
          // promise.all을 활용해서 배열안에 배열로 저장 [[#해쉬],[#소풍],[#ABC]]
            const result = await Promise.all(
                hashtags.map(tag => {
                  // 같은 태그가 있으면 추가 하지 않고 #제외하고 소문자로만 저장
                  return Hashtag.findOrCreate({
                    where: { tagName: tag.slice(1).toLowerCase() },
                  })
                }),
              );
              // console.log(result);
              // photo랑 hashtag랑 연결해줌 
            await photo.addHashtags(result.map(r => r[0]));
        }

      res.json({message: '사진이 업로드 되었습니다.'});
        },

    get : async (req,res) => {
      // 전체 photo 찾기 
      // include로 유저의 id랑 username 추가 
      // create를 역순으로 보내줌

            const photo = await Photo.findAll({
              include: {
                model : User,
                attributes: ['id','username'],
              },
              order: [['createdAt', 'DESC']]
            });
            // https://localhost:8080
            //res.render('/', photo)
            res.json(photo);
        },
    
    put : async (req,res) => {
          // 유저 정보 추출
          const authorization = req.headers.authorization;
          const token = authorization.split(' ')[1];
          const data = jwt.verify(token, process.env.ACCESS_SECRET);
          const {photoUrl, text, region } = req.body;
          const photoId = req.params.id;
          
          const userInfo = await User.findOne({ where: { id: data.id }});
          const photo = await Photo.findOne({where: {id : photoId }});

          //요청받은 params.id와 Photo.id를 일치시키고 관련된 정보를 수정함
          Photo.update({
            userId : userInfo.dataValues.id,
            photo : photoUrl,
            text : text,
            region : region,
           },
           {where : {id : photoId}}
           );
           const hashtags = text.match(/#[^\s#]*/g);
            // 해쉬태그 값이 있다면 해쉬태그 테이블에 추가 
          if (hashtags) {
            // promise.all을 활용해서 배열안에 배열로 저장 [[#해쉬],[#소풍],[#ABC]]
              const result = await Promise.all(
                  hashtags.map(tag => {
                    // 같은 태그가 있으면 추가 하지 않고 #제외하고 소문자로만 저장
                    return Hashtag.findOrCreate({
                      where: { tagName: tag.slice(1).toLowerCase() },
                    })
                  }),
                );
                // console.log(result);
                // photo랑 hashtag랑 연결해줌 
              await photo.addHashtags(result.map(r => r[0]));
          }
        res.json({message: '사진이 변경 되었습니다.'});
        },


    delete : async (req,res) => {
            // 유저로그인 된 상태에서 본인 게시글만 삭제가능
            // photo id를 받아서 id에 해당되는 게시글을 삭제한다.
            // 전체 게시글 삭제 관련 댓글 삭제
            // 해시태그는 만약에 다른 게시글에 없다면 
            const authorization = req.headers.authorization;
            const token = authorization.split(' ')[1];
            const data = jwt.verify(token, process.env.ACCESS_SECRET);
            const userInfo = await User.findOne({ where: { id: data.id }});
            const photoId = req.params.id;

            if(!userInfo) {
              res.status(400).json({message: '로그인 후 이용바랍니다.'});
            }

            const photo = await Photo.findOne({
              where : {id : photoId},
              include : {
                model : User,
                attributes : ['id']
              }
            });
            if(photo.User.id === userInfo.id ){
              Photo.destroy({
                where: {id : photoId },
              });
              res.json({message: '사진이 삭제되었습니다.'});
            }

            // hashtag에서 hashname이 없다면 삭제    
            // const tagId = await Hashtag.findOne({})
            
            // const hashtag = await Photo_hashtag.findOne({
            //     where : {
            //         [Op.and]: [{tagId: tag.id}, {photoId: photo.id }]

            //     }
            // })
        }
    };
