const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.reviewDate = now;
            pool.query(`insert into user_reviews (userId, rating, message, reviewDate, serviceId) values (?,?,?,?,?)`,
             [data.userId,data.rating, data.message, data.reviewDate, data.serviceId], 
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
        data.reviewDate = now;
        pool.query(`update user_reviews set rating = ?, message = ?, serviceId = ? where id = ? `,
         [data.rating, data.message, data.serviceId, data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
    deleteReview : (data, callback) => {
        pool.query(`delete from user_reviews where id = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllReviews : (data, callback) => {
        pool.query(`select * from user_reviews `,
         [], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },
}
