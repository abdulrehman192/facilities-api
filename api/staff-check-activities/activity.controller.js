const  {create, update, getMyCheckHistory, getStaffCheckHistory} = require("./activity.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createCheck : (request, response) =>{
        const body = request.body;
        if(!body.staffId)
        {
            return response.status(400).json({
                success : 0,
                message: "staffId is required"
            });
        }

        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required"
            });
        }

        if(!body.checkedIn)
        {
            return response.status(400).json({
                success : 0,
                message: "checkedIn is required"
            });
        }

        if(!body.checkedInLocation)
        {
            return response.status(400).json({
                success : 0,
                message: "checkedInLocation is required"
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
                message: "check successfully created",
            });
       });
    },

    updateCheck : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to update data"
            });
        }
        if(!body.checkedOut)
        {
            return response.status(400).json({
                success : 0,
                message: "checkedOut is required"
            });
        }

        if(!body.checkedOutLocation)
        {
            return response.status(400).json({
                success : 0,
                message: "checkedOutLocation is required"
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
                message: "check successfully updated",
            });
       });
    },

    getMyCheckHistory: (request, response) =>{
        const body = request.body;
        if(!body.staffId)
        {
            return response.status(400).json({
                success : 0,
                message: "staffId is required to get data"
            });
        }
        getMyCheckHistory(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                data: results
            });
       });
    },

    getStaffCheckHistory: (request, response) =>{
        const body = request.body;
        getStaffCheckHistory(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                data: results
            });
       });
    },

}
