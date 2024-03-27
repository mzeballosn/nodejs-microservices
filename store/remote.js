const request = require('request')

function createRemoteDB(host,port){
    const URL = 'http://'+host+':'+port //+'/api'
    console.log('remote creado')
    function listAll(table){        
        return req('GET',table)
    }
    /*
    function list(table,data)
    function upsert(table,data)
    function queryJoin(table,query,join)
    */
   function req(method,table,data){
    let url = URL + '/'+'ms/' + table 
    body = ''    
    return new Promise((resolve,reject) => {        
        request({
            method,
            headers:{
                'content-type':'application/json'
            },
            url,
            body,
        },(err,req,body)=>{
            if(err){
                console.error('Error con la base de datos remota',err)
                return reject(err.message)
            }
            const resp = JSON.parse(body)
            return resolve(resp.body)
        })
    })
   }
   return {
    listAll
   }
}

module.exports = createRemoteDB