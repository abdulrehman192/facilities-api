
const  {create, deleteService, getServices, searchServices,update} = require("./service.service");


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
                message : results
            });
        });
    },

    updateService : (request, response) => {
        var body = request.body;
        if(!body.serviceId)
        {
            return response.status(400).json({
                success : 0,
                message: "serviceId is required to update data"
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

    deleteService: (request, response) =>{
        var body = request.body;
        if(!body.serviceId)
        {
            return response.status(400).json({
                success : 0,
                message: "serviceId is required to delete data"
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
                message : results
            });
        });
    },

    
getServices : (request, response) => {
        getServices({}, (error, results) =>{
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

    searchServices : (request, response) => {
        searchServices(request.body, (error, results) =>{
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