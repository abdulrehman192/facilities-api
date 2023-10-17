const  {create, update, deleteMethod, getAllUserMethods} = require("./method.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createMethod : (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required"
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
                message: "payment method successfully created",
            });
       });
    },

    updateMethod : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to update data"
            });
        }
       update(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "payment method successfully updated",
            });
       });
    },

    deleteMethod : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to delete data"
            });
        }
       deleteMethod(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "payment method successfully deleted",
            });
       });
    },

    getAllUserMethods : (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required"
            });
        }
        getAllUserMethods(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                data : results
            });
       });
    },
}
