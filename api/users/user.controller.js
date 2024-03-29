
const  {create, deleteUser, getUsers, update, getUserById, getUserByPhone, updateFcm, sendNotification} = require("./user.service");
const { sign } = require("jsonwebtoken");
const multer = require('multer');
const bodyParser = require('body-parser');

module.exports = {
    createUser : (request, response) => 
    {
        const body = request.body;
        create(request, (error, result)=> {
            if(error)
            {
                if(error.includes("exists"))
                {
                    return response.status(409).json({
                        success : 0,
                        message : error
                    });
                }
                else{
                    return response.status(500).json({
                        success : 0,
                        message : error
                    });
                }
            }

            getUserByPhone(body, (error, results) => {
                if(error)
                {
                    return response.status(500).json({
                        success : 0,
                        message : error
                    });
                }
    
                if(!results)
                {
                    return response.status(404).json(
                        {
                            success : 0,
                            message : "User account not exists. Please signup first"
                        }
                    );
                }
                else
                {
                    const jsonToken = sign({result : results}, process.env.SECRET_KEY, {
                        expiresIn : "1400h"
                    });
                    return response.json({
                        success : 1,
                        message : "successfully login",
                        accessToken: jsonToken,
                        data : results
                    });
                }
            });

            
        });
    },

    updateUser : (request, response) => {

        if(!request.body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to update data"
            });
        }

        update(request, (error, results) => {
            if(error)
            {
                if(error.includes("exists"))
                {
                    return response.status(409).json({
                        success : 0,
                        message : error
                    });
                }
                else{
                    return response.status(500).json({
                        success : 0,
                        message : error
                    });
                }
            }

            return response.status(200).json({
                success : 1,
                data : results
            });
        });
    },

    updateUserFcm: (request, response) => {

        if(!request.body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to update data"
            });
        }

        if(!request.body.fcmToken)
        {
            return response.status(400).json({
                success : 0,
                message: "fcmToken is required to update data"
            });
        }

        updateFcm(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                message : "User fcm token successfully updated"
            });
        });
    },

    deleteUser: (request, response) =>{
        if(!request.body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to delete data"
            });
        }
        deleteUser(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                data : "user account successfully deleted"
            });
        });
    },

    getOneUserById : (request, response) => {
        
        const id = request.query.id;
        getUserById(id, (error, results)=>{
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }
            if(results.length <= 0)
            {
                return response.status(404).json({
                    success : 0,
                    message : "No Data Found"
                });
            }
            else{
                return response.json(
                    {
                        success : 1,
                        data : results[0]
                    }
                );
            }
        });
        
    },
    getAllUsers : (request, response) => {
        getUsers(request.body, (error, results) =>{
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }
            if(!results)
            {
                return response.json({
                    success : 0,
                    message : "No Data Found"
                });
            }

            return response.json(
                {
                    success : 1,
                    data : results
                }
            );
        });
    },

    login : (request, response) => {
        var body = request.body;
        if(!body.phone)
        {
            return response.status(400).json({
                success : 0,
                message: "phone is required to login"
            });
        }
        getUserByPhone(body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            if(!results)
            {
                return response.status(404).json(
                    {
                        success : 0,
                        message : "User account not exists. Please signup first"
                    }
                );
            }
            else
            {
                const jsonToken = sign({result : results}, process.env.SECRET_KEY, {
                    expiresIn : "1400h"
                });
                return response.status(200).json({
                    success : 1,
                    message : "successfully login",
                    accessToken: jsonToken,
                    data : results
                });
            }
        });
    },

    sendNotification: (request, response) => {
        const body = request.body;
        if(!body.title)
        {
            return response.status(400).json({
                success : 0,
                message: "title is required to send notification"
            });
        }

        if(!body.body)
        {
            return response.status(400).json({
                success : 0,
                message: "body is required to send notification"
            });
        }
       sendNotification(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }
            else{
                return response.status(200).json({
                    success : 1,
                    message: results,
                });
            }
       });
    }
    
};