//const store = require('./../../../store/mysql')
const config = require('../../../config')

if(config.remoteDB === true ){
    const store = require('./../../../store/remote-mysql')
}else{
    const store = require('./../../../store/mysql')
}


const ctrl = require('./controller')



// al objeto controlador lo tratamos como una funcion e inyectamos el origend datos
module.exports = ctrl(store) 

