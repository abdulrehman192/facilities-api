const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";



module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.createAt = now;
        const baseUrl = process.env.BASE_URL; 
        const fileUrls = req.files.map(file => `${baseUrl}/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            imageUrl = fileUrls[0];
        }
        pool.query(`select * from users where phone = ?`, [data.phone], (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
    
                pool.query(`Insert into users (phone, email, gender, country, latitude, longitude, imageUrl, name, fcmToken, createAt, updateAt) values (?,?,?,?,?,?,?,?,?,?,?)`, 
                [
                    data.phone, 
                    data.email, 
                    data.gender, 
                    data.country, 
                    data.latitude, 
                    data.longitude, 
                    imageUrl, 
                    data.name, 
                    data.fcmToken, 
                    data.createAt, 
                    data.updateAt, 
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    else{
                        
                        pool.query("select * from users where phone = ?", [data.phone], (error, result, fields) => {

                            if(error)
                            {
                                return callback(errorMessage);
                            }
                            return callback(null, result[0]);
                        });
                    }
                    
                });
            }
            else{
                return callback("User already exists with this phone number. Please login instead");
            }
        });
       
    },
    update : (req, callback) => {
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.updateAt = now;
        const baseUrl = process.env.BASE_URL;
        const fileUrls = req.files.map(file => `${baseUrl}/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            imageUrl = fileUrls[0];
        }
        pool.query(`select * from users where id = ?`, [data.id], (error, results, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(results.length <= 1){
                if(imageUrl)
                {
                    pool.query(`Update users set phone = ?, email = ?, gender = ? , country = ?, latitude = ?, longitude = ?, imageUrl = ?, name = ?, fcmToken = ?,  updateAt = ? where id = ?`, 
                [
                    data.phone, 
                    data.email, 
                    data.gender, 
                    data.country, 
                    data.latitude, 
                    data.longitude, 
                    imageUrl, 
                    data.name, 
                    data.fcmToken, 
                    data.updateAt, 
                    data.id,
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    pool.query("select * from users where id = ?", [data.id], (error, result, fields) => {

                        if(error)
                        {
                            return callback(errorMessage);
                        }
                        return callback(null, result[0]);
                    });
                }


                    );
                }
                else{
                    pool.query(`Update users set phone = ?, email = ?, gender = ? , country = ?, latitude = ?, longitude = ?, name = ?, fcmToken = ?,  updateAt = ? where id = ?`, 
                [
                    data.phone, 
                    data.email, 
                    data.gender, 
                    data.country, 
                    data.latitude, 
                    data.longitude, 
                    data.name, 
                    data.fcmToken, 
                    data.updateAt, 
                    data.id,
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    pool.query("select * from users where id = ?", [data.id], (error, result, fields) => {

                        if(error)
                        {
                            return callback(errorMessage);
                        }
                        return callback(null, result[0]);
                    });
                }


                    );
                }
            }
            else{
                return callback("User already exists with this phone number. Please use another number or login with this number");
            }

        });
        
        
    },

    deleteUser : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from users where id = ?", [data.id], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "user account successfully deleted");
        } );
    },

    getUserById : (id, callback) => {
        pool.query("select * from users where id = ?", [id], (error, result, fields) => {

            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result);
        });
    },
    getUsers : (data, callback)=> {
        pool.query("Select * from users",
        [],
            (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result);
            }
        );
    },
    getUserByPhone : (data, callback) =>{
        pool.query("Select * from users where phone = ?  ", [data.phone], (error, result, fields)=> {
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result[0]);
    
        });
    },
}