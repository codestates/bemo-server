const { User } = require("../../models");
const { Photo } = require("../../models");

module.exports = async (req, res) => {
    const test = await User.findOne({
        where: { username: req.body.username },
        include: [
            {
                model: Photo,
                required: false,
                attributes: ['text'],
            }
        ]
    })
    console.log(test);
}