const { response } = require("express");
const  {create, update, deleteBooking, getAllUserBookings, getDateWiseBookings, updateBookingPaymentStatus, getAllProfessionalBookings,cancelBooking, updateBookingStatus, getAllBookings, updateBookingProfessional, deleteBookingProfessional} = require("./booking.service");
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

    updateBookingStatus : (request, response) =>{
        const body = request.body;
        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required to cancel booking"
            });
        }
       updateBookingStatus(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "booking status successfully updated",
            });
       });
    },

    updateBookingPaymentStatus : (request, response) =>{
        const body = request.body;
        if(!body.bookingId)
        {
            return response.status(400).json({
                success : 0,
                message: "bookingId is required to update booking"
            });
        }
        if(!body.paymentReceived)
        {
            return response.status(400).json({
                success : 0,
                message: "paymentReceived is required to update booking"
            });
        }
       updateBookingPaymentStatus(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "booking payment status successfully updated",
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

    getAllProfessionalBookings : (request, response) =>{
        const body = request.body;
        if(!body.professionalId)
        {
            return response.status(400).json({
                success : 0,
                message: "professionalId is required"
            });
        }
        getAllProfessionalBookings(body, (error, results) =>{
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

    getDateWiseBookings : (request, response) =>{
        const body = request.body;
        if(!body.startDate)
        {
            return response.status(400).json({
                success : 0,
                message: "startDate is required"
            });
        }
        if(!body.endDate)
        {
            return response.status(400).json({
                success : 0,
                message: "endDate is required"
            });
        }
        getDateWiseBookings(body, (error, results) =>{
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

    updateBookingProfessional : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to update professional"
            });
        }
        if(!body.professionalId)
        {
            return response.status(400).json({
                success : 0,
                message: "professionalId is required to update professional"
            });
        }
        updateBookingProfessional(body, (error, results) =>{
        if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "booking professional successfully updated",
            });
       });
    },

    deleteBookingProfessional : (request, response) =>{
        const body = request.body;
        if(!body.id)
        {
            return response.status(400).json({
                success : 0,
                message: "id is required to delete booking professional"
            });
        }
        deleteBookingProfessional(body, (error, results) =>{
        if(error)
            {
    
                return response.status(500).json({
                    success : 0,
                    message : errorMessage
                });
            }

            return response.status(200).json({
                success : 1,
                message: "booking professional successfully deleted",
            });
       });
    },

}
