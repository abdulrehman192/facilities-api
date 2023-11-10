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
        pool.query(`select * from staff where phone = ?`, [data.phone], (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
    
                pool.query(`Insert into staff (phone, email, gender, role, imageUrl, name, fcmToken, createAt) values (?,?,?,?,?,?,?,?)`, 
                [
                    data.phone, 
                    data.email, 
                    data.gender, 
                    data.role, 
                    imageUrl, 
                    data.name, 
                    data.fcmToken, 
                    data.createAt, 
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    return callback(null, result);
                    
                });
            }
            else{
                return callback("Staff account already exists with this phone number. Please login instead");
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
        pool.query(`select * from staff where staffId = ?`, [data.staffId], (error, results, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(results.length <= 1){
                if(imageUrl)
                {
                    pool.query(`Update staff set phone = ?, email = ?, gender = ? , role = ?, imageUrl = ?, name = ?, fcmToken = ?,  updateAt = ? where staffId = ?`, 
                [
                    data.phone, 
                    data.email, 
                    data.gender, 
                    data.role, 
                    imageUrl, 
                    data.name, 
                    data.fcmToken, 
                    data.updateAt, 
                    data.staffId,
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        console.log("Here is the error");
                        return callback(errorMessage);
                    }
                    return callback(null, result);
                });
                }
                else{
                    pool.query(`Update staff set phone = ?, email = ?, gender = ? , role = ?, name = ?, fcmToken = ?,  updateAt = ? where staffId = ?`, 
                [
                    data.phone, 
                    data.email, 
                    data.gender, 
                    data.role, 
                    data.name, 
                    data.fcmToken, 
                    data.updateAt, 
                    data.staffId,
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        console.log("Here is the error");
                        return callback(errorMessage);
                    }
                    return callback(null, result);
                });
                }
            }
            else{
                return callback("Staff Account already exists with this phone number. Please use another number or login with this number");
            }

        });
        
        
    },

    deleteStaff : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from staff where staffId = ?", [data.staffId], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "staff account successfully deleted");
        } );
    },

    getStaffById : (id, callback) => {
        pool.query("select * from staff where staffId = ?", [id], (error, result, fields) => {

            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result);
        });
    },
    getStaff : (data, callback)=> {
        var text = "";
        if(data.text)
        {
            text = data.text;
        }
        pool.query("Select * from staff where name like ? or email like ? or phone like ? or role like ?",
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`],
            (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result);
            }
        );
    },
    getStaffByPhone : (data, callback) =>{
        pool.query("Select * from staff where phone = ?  ", [data.phone], (error, result, fields)=> {
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result[0]);
    
        });
    },
}