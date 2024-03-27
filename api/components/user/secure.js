const auth = require('./../../../auth')

module.exports =function checkOut(action){
    function middlware(req,res,next){
        switch(action){
            case 'update': 
                const owner = req.body.id
                auth.check.own(req,owner)
                next()
            break
            default: 
                next()
        }
    }

    return middlware
}


