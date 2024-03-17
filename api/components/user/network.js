const express = require('express')
const secure = require('./secure.js')
const response =  require('./../network/response')
const Controller = require('./index.js')


const router  = express.Router()

// un metodo para obtener el body 
// router.use(express.json())

router.get('/all',async (req,res)=>{    
    const list =    Controller.listAll()
                            .then((lista) => {
                                    response.success(req,res,lista,200)
                            }).catch((err) => {
                                response.error(req,res,err.message,500)
                            })
    
})


router.get('/',async (req,res)=>{    
    const list =    Controller.list()
                            .then((lista) => {
                                    response.success(req,res,lista,200)
                            }).catch((err) => {
                                response.error(req,res,err.message,500)
                            })
    
})

router.get('/:id',async  (req,res)=>{   
    const user =   Controller.get(req.params.id)
                                .then((user)=>{
                                    response.success(req,res,user,200)
                                }).catch((err)=>{
                                    response.error(req,res,err.message,500)
                                })     
})


router.post('/',(req,res)=>{    
    const data= req.body
    const id = Controller.upsert(data)
                         .then((user)=>{
                            response.success(req,res,user,200)
                         }).catch((err) =>{
                            response.error(req,res,err.message,500)
                         })   
})

router.patch('/:id', (req,res)=>{
    const { id } = req.params
    const  data  = req.body
    const pos  = Controller.update(id,data)
                             .then((user)=>{
                                response.success(req,res,user,200)
                             }).catch((err) =>{
                                response.error(req,res,err.message,500)
                             })   
})

router.put('/',secure('update'),(req,res)=>{    
    const data= req.body
    
    const id = Controller.upsert(data)
                         .then((user)=>{
                            response.success(req,res,user,200)
                         }).catch((err) =>{
                            response.error(req,res,err.message,500)
                         })  
})


module.exports = router