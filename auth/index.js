const config = require('./../config/config')
const jwt = require('jsonwebtoken')
const error = require('./../utils/error')

const secret = config.jwt.secret

function sign(data){
    return jwt.sign(data,secret)//,{expiresIn:'15min'})
}
 
function verify(token){    
    return jwt.verify(token,secret,function(err,decoded){
            console.log(decoded)
    })  
}

const check = {
    own: function(req,owner){
        const decoded = decodeHeader(req)
        if(!decoded){
            console.log('token invalido')
        }
        console.log(owner)
        if(decoded?.id === owner ){
            throw error('No puedes hacer esto',401)
            
        }

    },
}

function getToken(auth){
    if(!auth){
        throw new Error('Sin token')
    }
    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato invalido')
    }
    let token = auth.replace('Bearer ', '')
    return token
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}