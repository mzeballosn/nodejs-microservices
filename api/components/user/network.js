const express = require('express')
const secure = require('./secure.js')
const response =  require('./../network/response')
const Controller = require('./index.js')


const router  = express.Router()

// un metodo para obtener el body 
// router.use(express.json())

router.get('/all',async (req,res, next)=>{    
    const list =    Controller.listAll()
                            .then((lista) => {
                                    response.success(req,res,lista,200)
                            }).catch(next)    
})

router.get('/',async (req,res,next)=>{    
    const list =    Controller.listAll()
                            .then((lista) => {
                                    response.success(req,res,lista,200)
                            }).catch(next)    
})

router.get('/:id',async  (req,res,next)=>{   
    const user =   Controller.listOne(req.params.id)
                                .then((user)=>{
                                    response.success(req,res,user,200)
                                }).catch(next)     
})

router.post('/',(req,res, next)=>{    
    const data= req.body
    const id = Controller.upsert(data)
                         .then((user)=>{
                            response.success(req,res,user,200)
                         }).catch(next)   
})

router.post('/follow/:id',
  secure('follow'),
  (req, res, next)=>{    
       const to =  req.params.id
       const from = req.user.id
       Controller.follow(from,to)
                .then(data => {
                    response.success(req,res,data,201)
                }).catch(next)  
})
router.get('/:id/following',    
    (req,res,next)=>{
        const {id} = req.params
        const follows = Controller.followers(id)
                                    .then(data => {
                                        response.success(req,res,data,200)
                                    }).catch(next)  
                                                                        
})

router.patch('/:id', (req,res,next)=>{
    const { id } = req.params
    const  data  = req.user.id
    const pos  = Controller.upsert(id,data)
                             .then((user)=>{
                                response.success(req,res,user,200)
                             }).catch(next)   
})

router.put('/',
    secure('update'),
    (req,res,next)=>{    
        const data= req.body         
        const id = Controller.upsert(data)
                            .then((user)=>{
                                response.success(req,res,user,200)
                            }).catch(next)  
})



module.exports = router