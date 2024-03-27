const mysql = require('mysql')
const config = require('./../config/config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection

function handleCon(){
    connection = mysql.createConnection(dbconfig)
    connection.connect((err) =>{
        if(err){
            console.error('[db err]',err)
            setTimeout(handleCon,2000)
        }else{
                console.log('DB connected')
        }
        
        
    })
    connection.on('error', err => {
        console.error('[db err]',err)
        if(error.code === 'PROTOCOL_CONECTION__LOST'){
            handleCon()
        }else{
            throw err
        }
    })
}

handleCon()

function listAll(table){
    console.log(table)
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`,
                          (err,data)=>{
                            if(err) return reject(err)
                            resolve(data)
                          })
    })
}

function list(table,id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`,
                          (err,data)=>{
                            if(err) return reject(err)
                            resolve(data)
                          } )
    })
}

function insert(table,data){
    return new Promise((resolve,reject)=>{
        connection.query(`INSERT INTO ${table}
                          SET ? `,data,
                          (err,data)=>{
                            if(err) return reject(err)
                            resolve(data)
                          })

    })
}


function update(table,data){    
    const {id} = data
    if(Object.keys(id)){
        delete data.id
    }    
    return new Promise((resolve,reject)=>{
        connection.query(` UPDATE ${table} SET ? WHERE id=${id} `,[data],
                          (err,data)=>{
                            if(err) return reject(err)
                            resolve(data)
                          })

    })
}
function upsert(table,data){    
    if(data && data.id){        
        return update(table,data)
    }else{        
        return insert(table,data)
    }    
    
}

function query(table,data){    
    
    return new Promise((resolve,reject)=>{        
        connection.query(`SELECT * FROM ${table} WHERE ? `,[data],        
                          (err,data)=>{
                            if(err) return reject(err)
                            resolve(data)
                          
                          }
                        )
    })
}

function queryJoin(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

module.exports = {
    list,
    listAll,
    upsert,
    query,
    queryJoin,
}