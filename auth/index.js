const config = require('./../config/config')
const jwt = require('jsonwebtoken')
const error = require('./../utils/error')

const secret = config.jwt.secret

function sign(data){          
    return jwt.sign({ data }, secret, { expiresIn: "1h" });     
}
 
function verify(token){        
    return jwt.verify(token,secret,function(err,decoded){
            return(decoded)
    })
}

const check = {
    own: function(req,owner){
        const decoded = decodeHeader(req)
        const { data } = decoded
        
        if(!decoded){
            console.log('token invalido')
        }         
        if(data.id === owner ){
            throw error('No puedes hacer esto',401)            
        }
    },
    logged: function(req,owner){
        const decoded = decodeHeader(req)        
    },
    post: function(req){
        const decoded = decodeHeader(req)
        const { data } = decoded

        if(!decoded){
            console.log('token invalido')
        }
    }
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
    
    req.user = decoded.data;        
       
    return decoded;
}

module.exports = {
    sign,
    check,
}