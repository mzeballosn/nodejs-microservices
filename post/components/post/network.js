const express = require('express')
const response = require('./../../../api/components/network/response.js')
const Controller = require('./index.js')
const secure = require('./secure.js')
const router = express.Router()

router.get('/', async (req,res,next)=>{
    const list = Controller.listAll()
                           .then(lista => {
                             response.success(req,res,lista,200)
                           }).catch(next)    
})

router.post('/',
secure('create'),
async (req,res,next)=>{
  const data = req.body  
  const id = Controller.create(data,req.user)
                       .then(post => {
                        response.success(res,res,post,201)
                       }).catch(next)
})

router.patch('/:id',
secure('update'),
async (req,res,next)=>{
  const id = req.params.id
  const data = req.body
  const pos = Controller.update(id,data)
                        .then(post => {
                            response.success(req,res,post,200)
                        }).catch(next)
})


module.exports = router

