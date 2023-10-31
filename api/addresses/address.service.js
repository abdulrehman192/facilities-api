const pool = require("../../config/database");



module.exports = {
    create :(data, callback) => {
            const now = new Date();
            data.createAt = now;
            pool.query(`insert into addresses (userId, latitude, longitude, description, isDefault, createAt) values (?,?,?,?,?,?)`,
             [data.userId,data.latitude, data.longitude, data.description, data.isDefault, data.createAt], 
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
        if(data.isDefault)
        {
            console.log(data.isDefault);
            if(data.isDefault == '1')
            {
                console.log(data.userId);
                pool.query(`update addresses set isDefault = 0 where id != ? and userId = ?`, [data.id, data.userId],
                (error, results, fields)=> {
                    if(error)
                    {
                        return callback(error);
                    }
                }
                );
            }
        }
        pool.query(`update addresses set latitude = ?, longitude = ?, description = ?, isDefault = ?, updateAt = ? where id = ? and userId = ? `,
         [data.latitude, data.longitude, data.description, data.isDefault, data.updateAt, data.id, data.userId], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }

                
            return callback(null, results);
         });
    },
    deleteAddress : (data, callback) => {
        pool.query(`delete from addresses where id = ?`,
         [data.id], 
         (error, results, fields)=> {
            if(error)
                {
                    return callback(error);
                }
            return callback(null, results);
         });
    },

    getAllUserAddresses : (data, callback) => {
        pool.query(`select * from addresses where userId = ? order by isDefault desc`,
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
