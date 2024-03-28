module.exports ={
    remoteDB: process.env.remote_DB || false,
    api:{
        port:process.env.API_PORT || 3050
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'notasecretadelosandes'
    },
    mysql:{
        host: process.env.MYSQL_HOST || '172.23.0.4',
        user: process.env.MYSQL_USER || 'nico',
        password: process.env.MYSQL_PASS || 'admin123',
        database: process.env.MYSQL_DB || 'my_store'        
    },         
    mysqlServices:{
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3101,
    },
    post:{
        port: process.env.MYSQL_SRV_PORT || 3102,
    }
}