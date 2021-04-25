const { User } = require("../../models");
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const authorization = req.headers.authorization;
    if (authorization === undefined) {
        res.status(401).json({
            error: 'not authorized'
        })
    }
    else {
        const token = authorization.split(' ')[1]
        const data = jwt.verify(token, process.env.ACCESS_SECRET)
        console.log(data)
        await User.destroy({
            where: { id: data.id }
        })
        res.clearCookie('refreshToken');
        req.headers.authorization = null

        res.status(200).json({ "message": "회원탈퇴 되었습니다." })
    }
}