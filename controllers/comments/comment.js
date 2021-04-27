const jwt = require('jsonwebtoken');
const { User, Comment } = require("../../models");

module.exports = {
    post: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const photoId = req.params.id;

        const userInfo = await User.findOne({ where: { id: data.id } });
        if (!req.body.feed) {
            return res.status(400).json({ message: '내용을 입력해주세요.' })
        }

        Comment.create({
            userId: userInfo.dataValues.id,
            photoId: photoId,
            feed: req.body.feed
        })
        res.status(200).json({ message: '댓글이 등록되었습니다.' })
    },

    put: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const photoId = req.params.id;
        const commentId = req.params.id;

        const userInfo = await User.findOne({ where: { id: data.id } });

        if (!req.body.feed) {
            return res.status(400).json({ message: '내용을 입력해주세요.' })
        }

        Comment.update({
            userId: userInfo.dataValues.id,
            photoId: photoId,
            feed: req.body.feed
        },
            { where: { id: commentId } })
        res.status(200).json({ message: '내용이 변경되었습니다.' })

    },

    delete: async (req, res) => {
        const authorization = req.headers.authorization;
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        const commentId = req.params.id;

        const userInfo = await User.findOne({ where: { id: data.id } });

        if (!userInfo) {
            return res.status(400).json({ message: '로그인 후 이용바랍니다.' })
        }

        const comment = await Comment.findOne({
            where: { id: commentId },
            include: {
                model: User,
                attributes: ['id']
            }
        });
        if (comment.User.id === userInfo.id) {
            Comment.destroy({
                where: { id: commentId }
            })
            res.status(200).json({ message: '댓글이 삭제되었습니다.' })
        }
    }
}