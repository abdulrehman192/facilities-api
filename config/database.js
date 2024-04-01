// need to install mysql
const mysql = require("mysql2");

const pool = mysql.createPool({
    port : process.env.DB_PORT,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.MYSQL_DB,
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from(process.env.DB_PASS),
      },
}); 


module.exports = pool;