const express = require('express')
const Controller = require('./index.js')
const response = require('./../network/response.js')
const TABLA = 'user'


const router = express.Router()

router.post('/login', (req,res,next)=>{
    const data = req.body    
    Controller.login(data.username,data.password)
              .then((token)=>{                
                  response.success(req,res,token,200)
              }).catch(next)   
})      

module.exports = router