const pool = require("../../config/database");

var errorMessage = "Error while connecting to database server";



module.exports = {
    create : (req, callback) => {
        // Initialize imageUrl to null
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.subServiceCreateAt = now;
        const baseUrl = process.env.BASE_URL;
        const fileUrls = req.files.map(file => `${baseUrl}/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            imageUrl = fileUrls[0];
        }
        pool.query(`select * from sub_services where subServiceTitle = ?`, [data.subServiceTitle], (error, result, fields) => {
            if(error)
            {
                
                return callback(errorMessage);
            }
            if(result.length <= 0)
            {
                var fields = [
                    data.subServiceSubCategoryId, 
                    data.subServiceTitle, 
                    data.subServiceSubtitle, 
                    data.subServiceDescription, 
                    imageUrl, 
                    data.subServiceDuration, 
                    data.subServicePrice, 
                    data.maxQuantity,
                    data.subServiceCreateAt,
                ];
                pool.query(`insert into sub_services (subServiceSubCategoryId, subServiceTitle, subServiceSubtitle, subServiceDescription, subServiceImageUrl, subServiceDuration, subServicePrice, maxQuantity, subServiceCreateAt) values (?,?,?,?,?,?,?,?,?)`, 
                fields,
                (error, result, fields) => 
                {
                    if(error)
                    {
                        return callback(errorMessage);
                    }
                    else{
                        
                        return callback(null, "sub service successfully created");
                    }
                    
                });
            }
            else{
                return callback("sub service already exists with the same title. please choose another one");
            }
        });
       
    },
    update : (req, callback) => {
        let imageUrl = null;
        var data = req.body;
        const now = new Date();
        data.subServiceUpdateAt = now;
        const baseUrl = process.env.BASE_URL;
        const fileUrls = req.files.map(file => `${baseUrl}/files/${file.originalname}`);
        if(fileUrls.length > 0)
        {
            imageUrl = fileUrls[0];
        }
        
        if(imageUrl)
        {
            pool.query(`Update sub_services set subServiceImageUrl = ? , subServiceSubCategoryId = ?, subServiceTitle = ?, subServiceSubtitle = ? , subServiceDescription = ?, subServiceDuration = ?, subServicePrice = ?, maxQuantity = ?, subServiceUpdateAt = ? where subServiceId = ?`, 
        [
            imageUrl,
            data.subServiceSubCategoryId, 
            data.subServiceTitle, 
            data.subServiceSubtitle, 
            data.subServiceDescription, 
            data.subServiceDuration, 
            data.subServicePrice, 
            data.maxQuantity,
            data.subServiceUpdateAt,
            data.subServiceId,
        ],
        (error, result, fields) => 
        {
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, "sub service successfully updated");
        }


            );
        }
        else{
            pool.query(`Update sub_services set subServiceSubCategoryId = ?, subServiceTitle = ?, subServiceSubtitle = ? , subServiceDescription = ?, subServiceDuration = ?, subServicePrice = ?, maxQuantity = ?, subServiceUpdateAt = ? where subServiceId = ?`, 
        [
            data.subServiceSubCategoryId, 
            data.subServiceTitle, 
            data.subServiceSubtitle, 
            data.subServiceDescription, 
            data.subServiceDuration, 
            data.subServicePrice, 
            data.maxQuantity,
            data.subServiceUpdateAt,
            data.subServiceId,
        ],
        (error, result, fields) => 
        {
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, "sub service successfully updated");
        }


            );
        }
        
        
    },

    deleteService : (req, callback) =>{
        var data = req.body;
        pool.query("Delete from sub_services where subServiceId = ?", [data.subServiceId], (error, result, fields) => {
            if(error)
        {
            return callback(errorMessage);
        }
        return callback(null, "sub service successfully deleted");
        } );
    },

    getServices : (data, callback)=> {
        var text = data.text;
        if(!text)
        {
            text = "";
        }
        var query = `SELECT
        sc.categoryId,
        sc.categoryTitle,
        sc.categoryImageUrl,
        sc.categoryDescription,
        sc.categorySr,
        
        os.serviceId,
        os.serviceCategoryId,
        os.serviceTitle,
        os.serviceSubtitle,
        os.serviceDescription,
        os.serviceCoverImageUrl,
        os.duration,
        os.price,
        os.maxQuantity,
        os.serviceCreateAt,
        os.serviceUpdateAt,
       
        ssc.subCategoryId,
        ssc.subCategoryServiceId,
        ssc.subCategoryTitle,
        ssc.subCategoryDescription,
        ssc.subCategoryUrl,
    
        ss.subServiceId,
        ss.subServiceSubCategoryId,
        ss.subServiceTitle,
        ss.subServiceSubtitle,
        ss.subServiceDescription,
        ss.subServiceImageUrl,
        ss.subServiceDuration,
        ss.subServicePrice,
        ss.subServiceCreateAt,
        ss.subServiceUpdateAt
        
        FROM service_categories sc
        LEFT JOIN one_off_services os ON sc.categoryId = os.serviceCategoryId
        LEFT JOIN service_sub_categories ssc ON os.serviceId = ssc.subCategoryServiceId
        LEFT JOIN sub_services ss ON ssc.subCategoryId = ss.subServiceSubCategoryId
        Where categoryTitle like ? or serviceTitle like ? or serviceSubtitle like ? or serviceDescription like ? or subCategoryTitle like ? or subServiceTitle like ? or subServiceSubtitle like ? or subServiceDescription like ? order by categorySr asc;
    `;
        pool.query(query,
        [`%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, `%${text}%`, ],
            (error, result, fields) => {
            if(error)
            {
                return callback(errorMessage);
            }

            var rows = result;
            const serviceCategories = [];

            for (const row of rows) {
                let category = serviceCategories.find((c) => c.categoryId === row.categoryId);
        
                if (!category) {
                    category = {
                        categoryId: row.categoryId,
                        categoryTitle: row.categoryTitle,
                        categoryImageUrl: row.categoryImageUrl,
                        categoryDescription : row.categoryDescription,
                        categorySr: row.categorySr,
                        services: []
                    };
                    serviceCategories.push(category);
                }
                
                if(row.serviceId != null)
                {
                    let service = category.services.find((s) => s.serviceId === row.serviceId);

                    if (!service) {
                        service = {
                            serviceId: row.serviceId,
                            serviceCategoryId: row.serviceCategoryId,
                            serviceTitle: row.serviceTitle,
                            serviceSubtitle: row.serviceSubtitle,
                            serviceDescription: row.serviceDescription,
                            serviceCoverImageUrl: row.serviceCoverImageUrl,
                            duration: row.duration,
                            price: row.price,
                            maxQuantity: row.maxQuantity,
                            serviceCreateAt: row.serviceCreateAt,
                            serviceUpdateAt: row.serviceUpdateAt,
                            subCategories: []
                        };
                        category.services.push(service);
                    }
            
                if(row.subCategoryId != null)
                {
                    let subCategory = service.subCategories.find((sc) => sc.subCategoryId === row.subCategoryId);
            
                    if (!subCategory) {
                        subCategory = {
                            subCategoryId: row.subCategoryId,
                            subCategoryServiceId: row.subCategoryServiceId,
                            subCategoryTitle: row.subCategoryTitle,
                            subCategoryDescription: row.subCategoryDescription,
                            subCategoryUrl: row.subCategoryUrl,
                            subServices: []
                        };
                        service.subCategories.push(subCategory);
                    }

                    if(row.subServiceId != null)
                    {
                        let subService = subCategory.subServices.find((sc) => sc.subServiceId === row.subServiceId);
                        if(!subService)
                        {
                            subService = {
                                subServiceId: row.subServiceId,
                                subServiceSubCategoryId: row.subServiceSubCategoryId,
                                subServiceTitle: row.subServiceTitle,
                                subServiceSubtitle : row.subServiceSubtitle,
                                subServiceDescription: row.subServiceDescription,
                                subServiceImageUrl: row.subServiceImageUrl,
                                subServiceDuration: row.subServiceDuration,
                                subServicePrice: row.subServicePrice,
                                subServiceCreateAt: row.subServiceCreateAt,
                                subServiceUpdateAt: row.subServiceUpdateAt,
                            };
                            subCategory.subServices.push(subService);
                        }
                    }
                }
                                    

                                }
                            }
            
            return callback(null, serviceCategories);
            }
        );
    },

    getSubServices: (data, callback)=>{
        var text = data.text;
        if(!text)
        {
            text = "";
        }
        pool.query(`Select * from sub_services where subServiceTitle like ? or subServiceSubtitle like ? or subServiceDescription like ?  order by subServiceSubCategoryId asc`,
        [`%${text}%`,`%${text}%`,`%${text}%`], 
        (error, result, fields) =>{
            if(error)
            {
                return callback(errorMessage);
            }
            return callback(null, result);
        });
    }
}