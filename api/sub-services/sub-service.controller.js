
const  {create, deleteService, getServices, update} = require("./sub-service.service");


module.exports = {
    createService : (request, response) => 
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
                data : results
            });
        });
    },

    updateService : (request, response) => {

        if(!request.body.subServiceId)
        {
            return response.status(400).json({
                success : 0,
                message: "subServiceId is required to update data"
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
                data : results
            });
        });
    },

    deleteService: (request, response) =>{
        if(!request.body.subServiceId)
        {
            return response.status(400).json({
                success : 0,
                message: "subServiceId is required to delete data"
            });
        }
        deleteService(request, (error, results) => {
            if(error)
            {
                return response.status(500).json({
                    success : 0,
                    message : error
                });
            }

            return response.status(200).json({
                success : 1,
                data : results
            });
        });
    },

   
    getServices : (request, response) => {
        var body = request.body;
    
        getServices(body, (error, results) =>{
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