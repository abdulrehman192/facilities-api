const  {create, update, deleteBooking, getAllUserBookings, cancelBooking, getAllBookings} = require("./booking.service");
var errorMessage = "Error while connecting to database server";
module.exports = {
    createBooking : (request, response) =>{
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
                message: "booking successfully created",
            });
       });
    },

    updateBooking : (request, response) =>{
        const body = request.body;
        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required to update data"
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
                message: "booking successfully updated",
            });
       });
    },

    cancelBooking : (request, response) =>{
        const body = request.body;
        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required to cancel booking"
            });
        }
       cancelBooking(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "booking successfully cancelled",
            });
       });
    },

    deleteBooking : (request, response) =>{
        const body = request.body;
        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required to delete data"
            });
        }
       deleteBooking(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "booking successfully deleted",
            });
       });
    },

    getAllUserBookings : (request, response) =>{
        const body = request.body;
        if(!body.userId)
        {
            return response.status(400).json({
                success : 0,
                message: "userId is required"
            });
        }
        getAllUserBookings(body, (error, results) =>{
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

    getAllBookings : (request, response) =>{
        const body = request.body;
    
        getAllBookings(body, (error, results) =>{
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
