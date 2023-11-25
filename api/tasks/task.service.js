const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.createAt = now;
            pool.query(`insert into tasks (bookingId, title, description, status, createAt) values (?,?,?,?,?)`,
             [data.bookingId, data.title, data.description, 0, data.createAt], 
             (error, results, fields)=> {
                if(error)
                    {
                        return callback(error);
                    }
                return callback(null, results);
             });
    },
    update : (data, callback) => {
        const now = new Date();
        data.completeAt = now;
        pool.query(`update tasks set title = ?, description = ?, status = ?, completeAt = ? where id = ? `,
         [data.title, data.description, data.status, data.completeAt, data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
    deleteTask : (data, callback) => {
        pool.query(`delete from tasks where id = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
}
