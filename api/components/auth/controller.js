const bcrypt = require('bcrypt')
const auth = require('../../../auth')

const TABLA = 'auth'

module.exports = function(injectedStore){
    let store = injectedStore
    /*if(!store){
        store = require('../../../store/dummy')
    }*/

    async function upsert(data){
        const authData = {
            id: data.id
        }
        if(data.username){
            authData.username = data.username
        }        
        if(data.password){
            authData.password = await bcrypt.hash(data.password,10) 
        }
        return store.upsert(TABLA,authData)
    }

    function update(data,id){                
        return store.update(TABLA,data,id)
    }

    async function login(username,password){
        console.log('/// agui toy //////')
        const data = await store.query(TABLA,{
            username: username
        })                
        if(data.length == 0){
            throw new Error('información invalida')
        }else{
            return await bcrypt.compare(password,data[0].password)
                                .then(sonIguales => {                                
                                    if(sonIguales){                                                   
                                        return auth.sign(data[0])
                                    }else{
                                        throw new Error('información invalida')
                                    }
                                } )                            
            
        }
    } 
    return {
        upsert,
        update,
        login,
    }
}