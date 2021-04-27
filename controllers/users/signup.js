const { User } = require("../../models");
const  bcrypt  =  require ( 'bcrypt' );

module.exports = async (req, res) => {
    // TODO : 회원가입 로직 및 유저 생성 로직 작성
    // 회원가입에 필요한 username, email, password, mobile 을 구조분해 할당으로 req.body에서 선언함
    const { username, email, password } = req.body;
    // 한개라도 일치하지 않는다면 422상태와 'insufficient parameters supplied' 메세지를 보냄
    if (!username || !email || !password) {
        res.status(422).send('회원정보를 정확히 입력해주세요.')
    }
    // bcrypt를 이용하여 비밀번호 암호화
    const hash = await bcrypt.hash(password, 12);
    //findOrCreate - 특정 요소를 검색하거나, 존재하지 않으면 새로 생성
    //findOrCreate 메서드는 DB에 특정 요소가 존재하는지 검사합니다. 
    //만약 존재한다면 해당하는 인스턴스를 반환하고, 그렇지 않으면 새로 생성합니다.
    // 새로 생성하면 true, 생성하지 않으면 false 반환
    User.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            username: username,
            password: hash,
        }
    })
        // findOrCreate => [user값, boolean] 배열형태 
        .then(([user, created]) => {
            // false 라면 409상태와 'email exists'
            // console.log(user)
            // false, email 존재한다면
            if (!created) {
                res.status(409).send('이메일 또는 사용자이름이 이미 존재합니다.');
            }
            // true, email 존재하지 않으면
            res.status(201).json({message: '회원가입 되었습니다.', user});;
        });
}
