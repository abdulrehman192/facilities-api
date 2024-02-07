const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.createAt = now;
            pool.query(`insert into user_credits (userId, points, description, dateTime, expiryDate) values (?,?,?,?,?)`,
             [data.userId, data.points, data.description, data.dateTime, data.expiryDate], 
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
        pool.query(`update user_credits set points = points + ? where id = ? `,
         [data.points, data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }

                
            return callback(null, results);
         });
    },
    deleteCredits : (data, callback) => {
        pool.query(`delete from user_credits where id = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllUserCredits : (data, callback) => {
        pool.query(`select * from user_credits where userId = ? order by expiryDate desc`,
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
