const auth = require('./../../../auth')

module.exports = function checkOut(action){
    function middlware(req,res,next){
        switch(action){
            case 'create':                
                auth.check.post(req)
                next()
                break
            default:
                next()
        }
    }
    return middlware
}