const store = require('../../../store/mysql')
const TABLA = 'post'


module.exports  = function (injectedStore){
    let store = injectedStore

    async function  listAll(){
        return await store.listAll(TABLA)
    }
    async function listOne(id){
        return await store.list(TABLA,id)
    }       
    async function create(data,user){
        const row = {
            ...data,
            id_user:user.id
        }        
        return await store.upsert(TABLA,row)   
    }
    async function update(id,data){
        const row = {
            id:id,
            ...data,            
        }       
        return await store.upsert(TABLA,row)
    }
    return {
        listAll,
        listOne,
        create,
        update,
    }
}
