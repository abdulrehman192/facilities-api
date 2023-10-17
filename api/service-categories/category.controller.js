
const  {create, deleteCategory, getCategories, update} = require("./category.service");


module.exports = {
    createCategory : (request, response) => 
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

    updateCategory : (request, response) => {
        var body = request.body;
        if(!body.categoryId)
        {
            return response.status(400).json({
                success : 0,
                message: "categoryId is required to update data"
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

    deleteCategory: (request, response) =>{
        var body = request.body;
        if(!body.categoryId)
        {
            return response.status(400).json({
                success : 0,
                message: "categoryId is required to delete data"
            });
        }
        deleteCategory(request, (error, results) => {
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

    
getCategories : (request, response) => {
        getCategories({}, (error, results) =>{
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