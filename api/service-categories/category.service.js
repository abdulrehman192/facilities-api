const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";



module.exports = {
    create : (req, callback) => {
        var data = req.body;
        console.log(data);
        const now = new Date();
        data.createAt = now;
        if(req.files.length > 0)
        {
          data.categoryImageUrl = req.imageUrl;
        }
        pool.query(`select * from service_categories where categoryTitle = ?`, [data.categoryTitle], (error, result, fields) => {
            if(error)
            {
                
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
    
                pool.query(`Insert into service_categories (categoryTitle, categoryImageUrl, categoryDescription, categorySr) values (?,?,?,?)`, 
                [
                    data.categoryTitle, 
                    data.categoryImageUrl, 
                    data.categoryDescription, 
                    data.categorySr
                ],
                (error, result, fields) => 
                {
                    if(error)
                    {
                        
                        return callback(errorMessage);
                    }
                    else{
                        
                        return callback(null, "service category successfully created");
                    }
                    
                });
            }
            else{
                return callback("category already exists with this title. Please enter other title");
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
            pool.query(`Update service_categories set categoryTitle = ? , categoryImageUrl = ? , categoryDescription = ?, categorySr = ? where categoryId = ?`, 
            [
                data.categoryTitle, 
                imageUrl, 
                data.categoryDescription, 
                data.categorySr,
                data.categoryId
            ],
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "service category successfully updated");
                }
                
            });
        }
        else
        {
            pool.query(`Update service_categories set categoryTitle = ?, categoryDescription = ?, categorySr = ? where categoryId = ?`, 
            [
                data.categoryTitle, 
                data.categoryDescription, 
                data.categorySr,
                data.categoryId
            ],
            (error, result, fields) => 
            {
                if(error)
                {
                    return callback(errorMessage);
                }
                else{
                    
                    return callback(null, "service category successfully updated");
                }
                
            });
        }
    },

    deleteCategory : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from service_categories where categoryId = ?", [data.categoryId], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "Service Category successfully deleted");
        } );
    },


    getCategories : (data, callback)=> {
        pool.query("Select * from service_categories",
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