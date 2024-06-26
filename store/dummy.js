const db = {
    'user': [
        {id:1, name:'carlos'},
        {id:2, name:'mario'},
        {id:3, name:'julia'},
        {id:4, name:'ana'},
    ],
    'auth':[]
}
async function query(table,q){
    let col = await list(table)
    let keys = Object.keys(q)
    let key = keys[0]
    return col.filter(item => item[key] == q[key])[0] || null
}
async function listAll(table){
    return db
}
async function list(table){
    return db[table]
}

async function get(table,id){    
    let col = await list(table)
    return col.filter(item => item.id == id)[0] || null
}

async function upsert(table,data){    
    
    if(!db[table]){
        db[table] = []
    }

    db[table].push(data)
    const pos = db[table].length
    return db[table][pos-1]
}

async function update(table,data){
    const old_item = await get(table,data.id)
    const changes = {
        ...old_item,
        data
    } 
    return changes
}

async function remove(tabla,id){
    return true
}

function getIds(tabla){         
     return Object.keys(db[tabla]).length + 1
}

module.exports = { listAll, list,get,upsert,remove,getIds, update, query }