
const  {create, deleteStaff, sendBookingNotification, updatePassword, getStaff, update, getStaffById, getStaffByPhone, updateFcm, sendNotification} = require("./staff.service");
const { sign } = require("jsonwebtoken");


module.exports = {
    createStaffAccount : (request, response) => 
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

            return response.status(200).json({
                success : 1,
                message : "staff account successfully created"
            });
        });
    },

    updateStaffAccount : (request, response) => {

        if(!request.body.staffId)
        {
            return response.status(400).json({
                success : 0,
                message: "staffId is required to update data"
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
                message : "Staff account successfully updated"
            });
        });
    },

    updateStaffFcm: (request, response) => {

        if(!request.body.staffId)
        {
            return response.status(400).json({
                success : 0,
                message: "staffId is required to update data"
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
                message : "Staff fcm token successfully updated"
            });
        });
    },

    updatePassword: (request, response) => {

        if(!request.body.staffId)
        {
            return response.status(400).json({
                success : 0,
                message: "staffId is required to update data"
            });
        }

        if(!request.body.password)
        {
            return response.status(400).json({
                success : 0,
                message: "password is required to update data"
            });
        }

        updatePassword(request.body, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                message : "Staff password successfully updated"
            });
        });
    },

    deleteStaffAccount : (request, response) =>{
        if(!request.body.staffId)
        {
            return response.status(400).json({
                success : 0,
                message: "staffId is required to delete data"
            });
        }
        deleteStaff(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                data : "staff account successfully deleted"
            });
        });
    },

    getOneStaffAccountById : (request, response) => {
        
        const id = request.query.id;
        getStaffById(id, (error, results)=>{
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
    getAllStaffAccounts : (request, response) => {

        getStaff(request.body, (error, results) =>{
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
    staffLogin : (request, response) => {
        var body = request.body;
        if(!body.email)
        {
            return response.status(400).json({
                success : 0,
                message: "email is required to login"
            });
        }

        if(!body.password)
        {
            return response.status(400).json({
                success : 0,
                message: "password is required to login"
            });
        }
        getStaffByPhone(body, (error, results) => {
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
                        message : "staff account not exists. Please create account"
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

            return response.status(200).json({
                success : 1,
                message: results,
            });
       });
    },

    sendBookingNotification: (request, response) => {
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
        sendBookingNotification(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                message: results,
            });
       });
    }
    
};