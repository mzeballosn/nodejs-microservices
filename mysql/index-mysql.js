const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config/config')
const mysqlRoute = require('./network')

const app = express()

app.use(bodyParser.json())

//RUTAS
app.use('/ms',mysqlRoute)

app.listen(config.mysqlServices.port,()=>{
    console.log('Service MySql listen on port : ',config.mysqlServices.port)
})