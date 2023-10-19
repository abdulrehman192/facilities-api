
const  {create, deleteVoucher, getVouchers, update} = require("./voucher.service");


module.exports = {
    createVoucher : (request, response) => 
    {
        const body = request.body;
        create(request, (error, results)=> {
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
                message : results
            });
        });
    },

    updateVoucher : (request, response) => {
        var body = request.body;
        if(!body.voucherId)
        {
            return response.status(400).json({
                success : 0,
                message: "voucherId is required to update data"
            });
        }
        update(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                            success : 0,
                            message : error
                        });
            }

            return response.status(200).json({
                success : 1,
                message : results
            });
        });
    },

    deleteVoucher: (request, response) =>{
        var body = request.body;
        if(!body.voucherId)
        {
            return response.status(400).json({
                success : 0,
                message: "voucherId is required to delete data"
            });
        }
        deleteVoucher(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                message : results
            });
        });
    },

    
getVouchers : (request, response) => {
        getVouchers({}, (error, results) =>{
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
    
};