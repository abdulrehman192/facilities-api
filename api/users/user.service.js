const pool = require("../../config/database");
const axios = require('axios');
var errorMessage = "Error while connecting to database server";



module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.createAt = now;
        if(req.files.length > 0)
        {
            imageUrl = req.imageUrl;
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
        if(req.files.length > 0)
        {
            imageUrl = req.imageUrl;
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
        var text = "";
        if(data.text)
        {
            text = data.text;
        }
        pool.query("Select * from users where name like ? or phone like ? or email like ?",
        [`%${text}%`,`%${text}%`,`%${text}%`],
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

    updateFcm: (data, callback) =>{
        pool.query(`Update users set fcmToken = ? where id = ?`, 
        [
            data.fcmToken, 
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
    },
    sendNotification: (data, callback) => {
        var body = {
          "title" : data.title,
          "body" : data.body
        };
        pool.query(`select * from users`,[],
        (error, results, fields)=>{
          if(error)
            {
                return callback(error);
            }
            if(results.length > 0)
            {
                var err  = null;
                results.forEach(element => {
                  var deviceToken = element.fcmToken;
                  if(deviceToken)
                  {
                    var doc = {
                      "to" : deviceToken,
                      "priority" : "high",
                      "notification" : body,
                      "data": {}
                    };
      
                    var headers = {
                      "Content-Type" : "application/json; charset=UTF-8",
                      "Authorization" : "key=AAAAkE_QHH4:APA91bHdI-zTEfOlLxsK24zJGh8jWzx2jz2MB2QcaWTqXYRRxrd8PjpM0YfBSOcSbiOT8Rafagym9KIdSCXviTVzALXVFj0OVqHdqX3NAApYfVv5qOPt3azWqQMsf0NrBwEpuFHf0ABd",
                    };
      
                    var url = "https://fcm.googleapis.com/fcm/send";
                    axios.post(url, doc, {headers})
                    .then(response => {
                      // Handle the response data
                    //   console.log('Response:', response.data);
                    //   return callback(null, response.data);
                    })
                    .catch(error => {
                      err = error;
                    });
                  }
                });

                if(err){
                    return callback(err);
                }
                else
                {
                    return callback(null, "notification sent");
                }
            }
            else{
                return callback(null, "No user found");
            }
        }
        );
       }
}