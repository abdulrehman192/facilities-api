const { createPool } = require("mysql");

let pool;

// Check if the authentication mode is native
if (process.env.DB_AUTH_MODE === 'native') {
    pool = createPool({
        port: 3306,
        host: 'srv1144.hstgr.io',
        user: 'u438935127_facilities',
        password: 'Rehman92$!',
        database: 'u438935127_facilities',
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
    });
  
} else {
    // Connect to the MySQL server using non-native authentication mode
    pool = createPool({
        port: process.env.DB_PORT,
        host: 'srv1144.hstgr.io',
        user: 'u438935127_facilities',
        password: 'Rehman92$!',
        database: 'u438935127_facilities',
        connectionLimit: 1000,
        connectTimeout: 60 * 60 * 1000,
        acquireTimeout: 60 * 60 * 1000,
        timeout: 60 * 60 * 1000,
        authPlugins: {
            mysql_clear_password: () => () => Buffer.from(process.env.DB_PASS + '\0')
        }
    });
}

module.exports = pool;
