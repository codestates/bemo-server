require('dotenv').config();
// qs형태
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const axios = require('axios');

module.exports = (req, res) => {

    console.log(req.body);
    const code = req.body.authorizationCode

    axios.post("https://localhost:8080/auth/google/callback", {
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code"
    })
        .then(response => {
            console.log("RESPONSE", response)
            accessToken = response.data.access_token
            res.status(200).json({ accessToken: accessToken})
        })
        .catch(err => err)
}

//로그인: https://accounts.google.com/o/oauth2/auth?client_id=46699307706-tcro6jae2hr24mhrfi601r1iape29ont.apps.googleusercontent.com&redirect_uri=https://localhost:8080/auth/google/callback&response_type=code&scope=https://www.googleapis.com/auth/drive.metadata.readonly
//postman 요청
//https://oauth2.googleapis.com/token?code=4%2F0AY0e-g5cHPyp94qOz98zTKTy4l3WptDuLBmMbVa6zcHBaWb1ZJsT7jOlLbup_R47YFsl6w&client_id=46699307706-tcro6jae2hr24mhrfi601r1iape29ont.apps.googleusercontent.com&client_secret=5sFJVZY04aQY9k7YfpCCBRVj&redirect_uri=https://localhost:8080/auth/google/callback&grant_type=authorization_code
//google drive API 요청
//GET https://www.googleapis.com/drive/v2/files?access_token=access_token