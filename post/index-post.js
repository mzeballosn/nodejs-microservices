const express = require('express')
const bodyParser = require('body-parser')

const config  = require('../config/config')
const errors = require('../api/components/network/errors')

const postRouter = require('./components/post/network')


const app = express()
app.use(bodyParser.json())


//ROUTING
app.use('/post',postRouter)


app.use(errors)



app.listen(config.post.port,()=> {
    console.log('Servicio post listen on port:', config.post.port)
})