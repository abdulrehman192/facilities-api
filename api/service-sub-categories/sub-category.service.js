const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";



module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.createAt = now;
        if(req.files.length > 0)
        {
            imageUrl = req.imageUrl;
        }
        pool.query(`select * from service_sub_categories where subCategoryTitle = ?`, [data.subCategoryTitle], (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
    
                pool.query(`Insert into service_sub_categories (subCategoryTitle, subCategoryUrl, subCategoryDescription, subCategoryServiceId) values (?,?,?,?)`, 
                [
                    data.subCategoryTitle, 
                    imageUrl, 
                    data.subCategoryDescription, 
                    data.subCategoryServiceId,
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    else{
                        
                        return callback(null, "service sub category successfully created");
                    }
                    
                });
            }
            else{
                return callback("sub category already exists with this title. Please enter other title");
            }
        });
       
    },
    update : (req, callback) => {
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.updateAt = now;
        if(req.files.length > 0)
        {
            imageUrl = req.imageUrl;
        }
        
        if(imageUrl)
        {
            pool.query(`Update service_sub_categories set subCategoryTitle = ? , subCategoryUrl = ? , subCategoryDescription = ?, subCategoryServiceId = ? where subCategoryId = ?`, 
            [
                data.subCategoryTitle, 
                imageUrl, 
                data.subCategoryDescription, 
                data.subCategoryServiceId,
                data.subCategoryId
            ],
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "service sub category successfully updated");
                }
                
            });
        }
        else
        {
            pool.query(`Update service_sub_categories set subCategoryTitle = ? , subCategoryDescription = ?, subCategoryServiceId = ? where subCategoryId = ?`, 
            [
                data.subCategoryTitle, 
                data.subCategoryDescription, 
                data.subCategoryServiceId,
                data.subCategoryId
            ],
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "service sub category successfully updated");
                }
                
            });
        }
    },

    deleteCategory : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from service_sub_categories where subCategoryId = ?", [data.subCategoryId], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "service sub category successfully deleted");
        } );
    },


    getCategories : (data, callback)=> {
        pool.query("Select subCategoryId, subCategoryServiceId, serviceTitle, subCategoryTitle, subCategoryDescription, subCategoryUrl from service_sub_categories c inner join one_off_services s on c.subCategoryServiceId = s.serviceId ",
        [],
            (error, result, fields) => {
            if(error)
            {
                return callback(error);
            }
            return callback(null, result);
            }
        );
    },

}