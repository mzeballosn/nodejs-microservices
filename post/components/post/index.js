const store = require('./../../../store/mysql')
const ctrl = require('./controller')



// al objeto controlador lo tratamos como una funcion e inyectamos el origend datos
module.exports = ctrl(store) 

