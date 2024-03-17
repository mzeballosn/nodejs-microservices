const bcrypt = require('bcrypt')
const auth = require('./../../../auth')

const TABLA = 'auth'

module.exports = function(injectedStore){
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }

    async function upsert(data){
        const authData = {
            id: data.id
        }
        if(data.username){
            authData.username = data.username
        }
        console.log('antes de leer el password')
        if(data.password){
            authData.password = await bcrypt.hash(data.password,10) 
        }
        return store.upsert(TABLA,authData)
    }

    function update(data){        
        return store.update(TABLA,data)
    }

    async function login(username,password){
        const data = await store.query(TABLA,{
            username: username
        })          
        return await bcrypt.compare(password,data.password)
                            .then(sonIguales => {
                                if(sonIguales){
                                    return auth.sign(data)
                                }else{
                                    throw new Error('información invalida')
                                }
                            } )
        /*
        if(data?.password === password){
            //generar token
            return auth.sign(data)
        }else{
            throw new Error('información invalida')
        }
        return data 
        */
    } 

    return {
        upsert,
        update,
        login
    }
}