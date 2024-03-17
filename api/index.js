const express = require('express')
// se instala body-parser para obtener el body de la consulta
const bodyParser = require('body-parser')

const swaggerUi = require('swagger-ui-express')

const config  = require('./../config/config')

const userRouter = require('./components/user/network')
const authRouter = require('./components/auth/network')
const errors = require('./components/network/errors')


const app = express()
app.use(bodyParser.json())

const swaggerDoc = require('./swagger.json')
//ROUTING
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc))

app.use(errors)



app.listen(config.api.port,()=> {
    console.log('Api listen on port:', config.api.port)
})