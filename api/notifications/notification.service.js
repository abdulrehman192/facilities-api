const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.dateTime = now;
            pool.query(`insert into notifications (userId, userType, title, description, dateTime) values (?,?,?,?,?)`,
             [data.userId, data.userType, data.title, data.description, data.dateTime], 
             (error, results, fields)=> {
                if(error)
                    {
                        return callback(error);
                    }
                return callback(null, results);
             });
    },
   

    getNotifications: (data, callback) => {
    
        pool.query(`select * from notifications where userId = ?`,
        [data.userId], 
        (error, results, fields)=> {
           if(error)
               {
                   return callback(error);
               }
           return callback(null, results);
        });
    }
}
