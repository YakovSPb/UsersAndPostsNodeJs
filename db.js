const Pool=  require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     password: 'newpassword',
//     host: 'localhost',
//     port: 5432,
//     database: 'node_postgres'
// })
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL ,
})

module.exports = pool