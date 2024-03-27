const remote = require('./remote')
const config = require('./../config/config')

module.exports = new remote(config.mysqlServices.host,config.mysqlServices.port)