const  {create, update, deleteTask} = require("./task.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createTask : (request, response) =>{
        const body = request.body;
        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required"
            });
        }

        if(!body.title)
        {
            return response.status(400).json({
                success : 0,
                message: "title is required"
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
                message: "task successfully created",
            });
       });
    },

    updateTask : (request, response) =>{
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
                message: "task successfully updated",
            });
       });
    },

    deleteTask: (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to delete data"
            });
        }
        deleteTask(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "task successfully deleted",
            });
       });
    },

}
