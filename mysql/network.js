const express = require('express')
const response = require('../api/components/network/response')
const Store = require('./../store/mysql')


const router = express.Router()

router.get('/:table',listAll)
router.get('/:table/:id',list)
router.post('/:table',insert)
router.put('/:table',upsert)

async function listAll(req,res,next){
    const data = await Store.listAll(req.params.table)
    response.success(req,res,data,200)
}
async function list(req,res,next){
    const data = await Store.list(req.params.table,req.params.id)
    response.success(req,res,data,200)
}
async function insert(req,res,next){
    const data = await Store.insert(req.params.table,req.params.id)
    response.success(req,res,data,200)
}
async function upsert(req,res,next){
    const data = await Store.upsert(req.params.table,req.params.id)
    response.success(req,res,data,200)
}


module.exports = router