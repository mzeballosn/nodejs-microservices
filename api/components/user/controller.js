const store = require('./../../../store/mysql')
const TABLA = 'user'
const auth = require('../../components/auth')


module.exports = function (injectedStore){
    let store = injectedStore
    

    if(!store){
        store = require('./../../../store/mysql')
    }
    function listAll(){        
        return store.listAll(TABLA)
    }
    

    function listOne(id){        
        return store.list(TABLA,id)
    }

    async function upsert(id,data){        
        const user ={
            id:id,
            name: data.name,
            username:data.username,
        }  

        if(data.password || data.username){
            const row = { id: id}            
            if(data.username){row.username=data.username}
            if(data.password){row.password=data.password}
            
            await auth.upsert(row)            
        }
        return store.upsert(TABLA,user)
    }

    async function update(id,data){          
        let update_user ={
            id:id
        }
        
        if(data.name){update_user.name = data.name} 
        if(data.username){update_user.username = data.username} 
        if(data.password){update_user.password = data.password}
        
        let usr = await auth.update(update_user)
        
        return usr
    }

    async function follow(from, to){
        return await store.upsert(TABLA+'_follow',{
            user_from: from,
            user_to:to
        })
    }

    async function followers(user){
        const join = {}
        join[TABLA] = 'user_to' // user: 'user_to'
        const query = {user_from: user}
        return await store.queryJoin(TABLA+'_follow',query,join)
    }
    return {
        listAll,
        listOne,           
        upsert,   
        update,
        follow,
        followers,
    }
}
