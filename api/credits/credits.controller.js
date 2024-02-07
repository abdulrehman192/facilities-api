const  {create, update, deleteCredits, getAllUserCredits} = require("./credits.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createCredit : (request, response) =>{
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
                message: results,
            });
       });
    },

    updateCredit : (request, response) =>{
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
                message: "credit successfully updated",
            });
       });
    },

    deleteCredit : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to delete data"
            });
        }
       deleteCredit(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "credit successfully deleted",
            });
       });
    },

    getAllUserCredits : (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required"
            });
        }
        getAllUserCredits(body, (error, results) =>{
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
