const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.createAt = now;
            pool.query(`insert into user_payment_methods (userId, cardNumber, expiryDate, cvv, description, createAt) values (?,?,?,?,?,?)`,
             [data.userId,data.cardNumber, data.expiryDate, data.cvv, data.description, data.createAt], 
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
        data.updateAt = now;
        pool.query(`update user_payment_methods set cardNumber = ?, expiryDate = ?, cvv = ?, description = ?, updateAt = ? where id = ? `,
         [data.cardNumber, data.expiryDate, data.cvv, data.description, data.updateAt, data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
    deleteMethod : (data, callback) => {
        pool.query(`delete from user_payment_methods where id = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllUserMethods : (data, callback) => {
        pool.query(`select * from user_payment_methods where userId = ?`,
         [data.userId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
}
