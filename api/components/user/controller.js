const store = require('./../../../store/dummy')
const TABLA = 'user'
const auth = require('../../components/auth')


module.exports = function (injectedStore){
    let store = injectedStore
    

    if(!store){
        store = require('./../../../store/dummy')
    }
    function listAll(){        
        return store.listAll(TABLA)
    }
    
    function list(){        
        return store.list(TABLA)
    }

    function get(id){        
        return store.get(TABLA,id)
    }

    async function upsert(data){
        const user ={
            name: data.name,
            username:data.username,
        }
        
        if(data.id){
            user.id=data.id
        }else{
            user.id=store.getIds(TABLA)            
        } 

        if(data.password || data.username){
            await auth.upsert({
                id: user.id,            
                username:  data.username,
                password: data.password
            })            
        }
        return store.upsert(TABLA,user)
    }
    async function update(id,data){  
        console.log('controlelr user update')      
        let update_user ={
            id:id
        }
        
        if(data.name){update_user.name = data.name} 
        if(data.username){update_user.username = data.username} 
        if(data.password){update_user.password = data.password}
        
        let usr = await auth.update(update_user)
        
        return usr
    }
    return {
        listAll,
        list, 
        get,
        upsert,   
        update
    }
}
