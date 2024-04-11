// const expressJwt = require('express-jwt')
const { expressjwt: jwt } = require("express-jwt");
function authJwt(){
    const secret = process.env.SECRET_KEY
        const api = process.env.API_URL
    return jwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            {url: /\/api\/v1\/product(.*)/, method:['GET', 'OPTION']},
            {url: /\/api\/v1\/category(.*)/, method:['GET', 'OPTION']},
            
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

 async function isRevoked(req, payload, done){

    if(!payload.isAdmin){
        done(null, true)
    }
  done();
}
module.exports = authJwt