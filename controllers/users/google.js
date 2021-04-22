require('dotenv').config();
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const axios = require('axios');

module.exports = (req, res) => {

  console.log(req.body);
  const code = req.body.authorizationCode
  
  axios.post("https://localhost/:8080/auth/google/callback", {
    client_id: clientID,
    client_secret: clientSecret,
    code: code,
    grant_type : "authorization_code"
  })
    .then(response => {
      console.log("RESPONSE", response)
      accessToken = response.data.access_token
      res.status(200).json({ accessToken: accessToken })
    }
    )
    .catch(err => err)
}
