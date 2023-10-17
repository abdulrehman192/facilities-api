const  {create, update, deleteAddress, getAllUserAddresses} = require("./address.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createAddress : (request, response) =>{
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
                message: "address successfully created",
            });
       });
    },

    updateAddress : (request, response) =>{
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
                message: "address successfully updated",
            });
       });
    },

    deleteAddress : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to delete data"
            });
        }
       deleteAddress(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "address successfully deleted",
            });
       });
    },

    getAllUserAddresses : (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required"
            });
        }
        getAllUserAddresses(body, (error, results) =>{
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
