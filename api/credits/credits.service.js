const { query } = require("express");
const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.createAt = now;
            console.log(data);
            var x = {};
            var err = null;
            var sql = `select * from user_credits where userId = ? and dateTime = ? `;
            var fields  = [data.userId, data.dateTime,];
            pool.query(sql, fields,(error, result, fields)=> {      
                if(error)
                {
                    err = error;
                    return callback(err, null);
                }
                else{
                    var length = result.length;
                    if(length > 0){
                        x = result[0];
                        pool.query(`update user_credits set points = points + ? where userId = ? and dateTime = ? `,
                        [data.points, data.userId, data.dateTime], 
                        (error, results, fields)=> {
                            if(error)
                            {
                                err = error;
                                return callback(err, null);
                            } 
                            else{
                                x.points = parseInt(x.points) + parseInt(data.points);
                                return callback(err, x);
                            }
                           
                        });
                    }
                    else{
                        pool.query(`insert IGNORE into user_credits (userId, points, description, dateTime, expiryDate) values (?,?,?,?,?)`,
                        [data.userId, data.points, data.description, data.dateTime, data.expiryDate], 
                        (error, results, fields)=> {
                           if(error)
                            {
                                err = error;
                                return callback(err, null);
                            }
                           else{
                            pool.query(sql, fields,(error, result, fields)=> {
                                if(error)
                                {
                                    return callback(error, null);
                                }
                                else{
                                    length = result.length;
                                    if(result){
                                        x = result[0];
                                        return callback(null, x);
                                    }
                                    else{
                                        return callback("no record found", {});
                                    }
                                }
                            });
                           }
                        });
                    }
                    
                }
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
