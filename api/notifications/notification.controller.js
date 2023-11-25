const  {create, getNotifications} = require("./notification.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createNotifications : (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required"
            });
        }

        if(!body.userType)
        {
            return response.status(400).json({
                success : 0,
                message: "userType is required"
            });
        }

        if(!body.title)
        {
            return response.status(400).json({
                success : 0,
                message: "title is required"
            });
        }

        if(!body.description)
        {
            return response.status(400).json({
                success : 0,
                message: "description is required"
            });
        }
       create(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "notifications successfully created",
            });
       });
    },

    getNotifications: (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required to get data"
            });
        }
        getNotifications(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                data : results,
            });
       });
    },

}
